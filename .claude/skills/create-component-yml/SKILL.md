---
name: create-component-yml
description: Creates a Single Directory Component (SDC) metadata file (.component.yml) for a Gesso component. Use when user wants to create a metadata file for a single directory component.
---

# Create Component YML

Creates a Single Directory Component (SDC) metadata file (.component.yml) for a Gesso component.

## Usage

```
/create-component-yml <component-name>
```

Example: `/create-component-yml article`

## Instructions

When this skill is invoked:

1. **Locate the component directory**
   - The component name will be provided as an argument
   - Component directory path: `components/<component-name>/`
   - If the directory doesn't exist, inform the user and exit

2. **Read component files**
   - Read `<component-name>.twig` - to identify props and slots (from blocks)
   - Read `<component-name>.stories.jsx` - to understand controls/args
   - Read `<component-name>.yml` - to see default values (optional, may not exist)

3. **Check for existing .component.yml**
   - Look for `<component-name>.component.yml` in the component directory
   - If it exists, ask the user if they want to overwrite it
   - If user declines, exit gracefully

4. **Analyze the files to determine:**
   - **Props**: Variables used in the Twig template (excluding blocks)
   - **Slots**: Twig blocks defined with `{% block name %}`
   - **Types**: Infer types from the Twig template and stories file
     - String types: Most text variables
     - Boolean types: Variables used in conditionals
     - Array types: Variables used in loops or known Drupal arrays (title_prefix, title_suffix)
     - Unknown/render arrays: Move to slots instead of props
   - **Optional props**: Identify which props are optional by checking:
     - Props that are only used within conditional checks (if statements)
     - Props explicitly marked as optional in existing .yml file
     - Props not included in the existing .yml file or passed explicitly as args in the .stories.jsx file
     - Common optional props: modifier_classes, title_prefix, title_suffix, author_name, date_format, etc.

5. **Generate .component.yml file**
   - Use the schema: `https://git.drupalcode.org/project/drupal/-/raw/HEAD/core/assets/schemas/v1/metadata.schema.json`
   - **Required structure:**
     ```yaml
     $schema: https://git.drupalcode.org/project/drupal/-/raw/HEAD/core/assets/schemas/v1/metadata.schema.json
     name: <Component Name>
     props:
       type: object
       properties:
         # ... prop definitions
         # For required props: type: string
         # For optional props: type: [string, "null"]
     slots:
       # ... slot definitions
       # Include only if there is at least one slot
     libraryOverrides:
       dependencies:
         - gesso/global
     ```

6. **Important patterns and rules:**
   - DO NOT include `status` key
   - DO NOT include top-level `description` key
   - `title_prefix` and `title_suffix` are ALWAYS type `array`
   - Each prop should have: `type`, `title`, and `description`
   - Each slot should have: `title`
   - ALWAYS include `libraryOverrides.dependencies: [gesso/global]`
   - If uncertain about a prop's type (like render arrays), move it to slots
   - Use descriptive titles and descriptions for all props
   - Use descriptive titles for all slots
   - If there are no props, declare this explicitly: `properties: {}`
   - If there are no slots, do not include the `slots` key
   - **Optional props MUST use multi-type syntax:**
     - For optional string props: `type: [string, "null"]`
     - For optional array props: `type: [array, "null"]`
     - For optional boolean props with no default: `type: [boolean, "null"]`
     - DO NOT use `nullable: true` - it doesn't work in Drupal's component validation
     - Common optional props that should be nullable: modifier_classes, title_prefix, title_suffix, author_name, date_format, date, author, content fields

7. **Create the file**
   - Write to: `components/<component-name>/<component-name>.component.yml`
   - Inform the user of success and the file location

## Example Output

For a component with title (required), content (optional), and modifier_classes (optional) props, and a footer block:

```yaml
$schema: https://git.drupalcode.org/project/drupal/-/raw/HEAD/core/assets/schemas/v1/metadata.schema.json
name: Example Component
props:
  type: object
  properties:
    title:
      type: string
      title: Title
      description: 'The component title.'
    modifier_classes:
      type:
        - string
        - "null"
      title: Modifier Classes
      description: 'Additional CSS classes.'
    content:
      type:
        - string
        - "null"
      title: Content
      description: 'The main content.'
slots:
  footer:
    title: Footer
    description: 'The footer section.'
libraryOverrides:
  dependencies:
    - gesso/global
```

## Error Handling

- If component directory not found: Display error and exit
- If required files missing (.twig): Inform user and ask if they want to continue
- If overwrite declined: Exit gracefully with confirmation message
