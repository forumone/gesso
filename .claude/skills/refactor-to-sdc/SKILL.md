---
name: refactor-to-sdc
description: Refactors a Gesso component from source/03-components to Single Directory Component (SDC) structure in /components.
context: fork
agent: sdc-refactor
---

# Refactor to SDC

Refactors a Gesso component from the old structure (`source/03-components/`) to Single Directory Component (SDC) structure in the `/components/` directory.

## Usage

```
/refactor-to-sdc <component-name>
```

Example: `/refactor-to-sdc card`

## Instructions

When this skill is invoked:

### 1. Validate Component Exists
- Component name will be provided as an argument
- Source path: `source/03-components/<component-name>/`
- If the directory doesn't exist, inform the user and exit
- Check if component already exists in `components/<component-name>/`:
  - If it exists, ask user if they want to overwrite
  - If user declines, exit gracefully

### 2. Move and Rename Files

**Move the entire directory:**
- From: `source/03-components/<component-name>/`
- To: `components/<component-name>/`

**Rename SCSS file:**
- From: `_<component-name>.scss`
- To: `<component-name>.source.scss`
- Note: Remove the `_` prefix and add `.source` suffix

**Rename JavaScript files (if they exist):**
- Main JS: `<component-name>.es6.js` → `<component-name>.source.js`
- Keep all other JS files with their original names but update their imports

**Keep unchanged:**
- `<component-name>.twig` (same name)
- `<component-name>.yml` (same name)
- `<component-name>.stories.jsx` (same name)
- Any other supporting files

### 3. Update File Contents

**In `<component-name>.stories.jsx`:**
- Update import paths:
  - `'../../../.storybook/decorators'` → `'../../.storybook/decorators.jsx'`
  - `'../../00-config/storybook.global-data.yml'` → `'../../source/00-config/storybook.global-data.yml'`
  - Update any component imports from `'../other-component/'` to either:
    - `'../../source/03-components/other-component/'` (if not yet refactored)
    - `'../../components/other-component/'` (if already refactored to SDC)

**In JavaScript files:**
- Update any relative imports to account for the new location
- If JS files import other components, update those paths accordingly

### 4. Identify Prop/Slot Collisions

**Read the Twig template** to identify:
- All props (variables passed in)
- All slots (Twig blocks defined with `{% block name %}`)

**Check for collisions:**
- If a prop has the same name as a slot, it must be renamed
- Common collisions: `title`, `content`, `footer`, `header`
- Rename strategy: Add component-specific prefix (e.g., `title` → `article_title`)

**Update the Twig file:**
- Replace all instances of the colliding prop with the new name
- Keep slot names unchanged
- Example from article.twig:
  ```twig
  {# BEFORE: #}
  {% include 'gesso:page-title' with {
    'page_title': title,
  } only %}

  {# AFTER: #}
  {% include 'gesso:page-title' with {
    'page_title': article_title,
  } only %}
  ```

### 5. Create .component.yml File

**Generate the metadata file:**
- Use the `/create-component-yml` skill or manually create it
- Path: `components/<component-name>/<component-name>.component.yml`
- Include all props with their renamed versions (if collisions were fixed)
- Include all slots
- Add `libraryOverrides` section with dependencies

**Check for JS dependencies:**
- If component has JavaScript, check what Drupal libraries it uses
- Common dependencies: `core/drupal`, `core/once`, `core/drupalSettings`
- Add these to `libraryOverrides.dependencies` in .component.yml
- Example:
  ```yaml
  libraryOverrides:
    dependencies:
      - core/drupal
      - core/once
      - gesso/global
  ```

### 6. Update source/03-components/_index.scss

- Remove the import line for the refactored component
- Example: Remove `@use 'article/article';`
- Keep alphabetical order of remaining imports

### 7. Update Twig Template References

**Search for files that reference the component:**
- Search pattern: `@components/<component-name>/` or `include.*<component-name>.twig` or `embed.*<component-name>.twig` or `extend.*<component-name>.twig`
- Look in both `source/` and `components/` directories

**Update references to use SDC syntax:**
- From: `@components/<component-name>/<component-name>.twig`
- To: `gesso:<component-name>`
- Example:
  ```twig
  {# BEFORE: #}
  {% embed '@components/article/article.twig' with {
    'title': title,
  } %}

  {# AFTER: #}
  {% embed 'gesso:article' with {
    'article_title': title,
  } %}
  ```

**Update renamed props in references:**
- If props were renamed (due to slot collisions), update all references
- Search for all files that pass the old prop name to this component
- Replace with the new prop name

### 8. Update gesso.libraries.yml

**Check if library exists:**
- Look for `<component-name>:` or `<component_with_underscores>:` in `gesso.libraries.yml`
- Component names with hyphens use underscores in library names (e.g., `icon-link` → `icon_link`)

**If library exists, remove it:**
- Delete the entire library entry (including css, js, and dependencies sections)
- Example: Remove the entire `icon_link:` section

**Update dependent libraries:**
- Search for `- gesso/<component_library_name>` in gesso.libraries.yml
- Replace with: `- core/components.gesso--<component-name>`
- Example:
  ```yaml
  # BEFORE:
  dependencies:
    - gesso/icon_link

  # AFTER:
  dependencies:
    - core/components.gesso--icon-link
  ```
- Note: SDC dependencies use hyphens, not underscores

### 9. Remove Original Component Directory

**Delete the source directory:**
- Remove: `source/03-components/<component-name>/`
- This directory should now be empty or contain only the files we've already moved
- Use `rm -rf source/03-components/<component-name>/` to remove it completely
- Confirm deletion was successful

### 10. Verify and Test

**Run git status:**
- Show what files were moved/modified/deleted
- Confirm changes look correct

**Checklist for user:**
- [ ] Files moved to `components/<component-name>/`
- [ ] SCSS renamed to `<component-name>.source.scss`
- [ ] JS renamed to `<component-name>.source.js` (if applicable)
- [ ] Import paths updated in stories and JS files
- [ ] Prop/slot collisions resolved in Twig
- [ ] `.component.yml` created with all props, slots, and dependencies
- [ ] Component removed from `source/03-components/_index.scss`
- [ ] Twig references updated to `gesso:<component-name>` syntax
- [ ] Renamed props updated in all referencing files
- [ ] Library removed from `gesso.libraries.yml` (if existed)
- [ ] Dependent libraries updated to use `core/components.gesso--<component-name>`
- [ ] Original directory deleted from `source/03-components/`

**Recommend next steps:**
1. Run Storybook to verify component still renders
2. Clear Drupal cache: `drush cr`
3. Test component in Drupal
4. Run build process: `npm run build`

## Example: Refactoring "icon-link" Component

### Before:
```
source/03-components/icon-link/
  _icon-link.scss
  icon-link.es6.js
  icon-link.twig
  icon-link.yml
  icon-link.stories.jsx
```

### After:
```
components/icon-link/
  icon-link.source.scss
  icon-link.source.js
  icon-link.twig
  icon-link.yml
  icon-link.stories.jsx
  icon-link.component.yml
```

### Changes in gesso.libraries.yml:
```yaml
# REMOVED:
icon_link:
  css:
    theme:
      dist/css/icon-link.css: {}
  dependencies:
    - gesso/global

# UPDATED (in file component that depends on icon_link):
file:
  css:
    theme:
      dist/css/file.css: {}
  dependencies:
    - gesso/global
    - core/components.gesso--icon-link  # Changed from gesso/icon_link
```

## Error Handling

- If component directory not found: Display error with available components
- If destination already exists: Ask user to confirm overwrite
- If .component.yml creation fails: Inform user and provide manual steps
- If no files reference the component: Inform user but continue
- After each major step, confirm success before proceeding

## Notes

- This is a complex, multistep refactoring process
- Use TodoWrite to track progress through all steps
- After completion, provide a summary of all changes made
