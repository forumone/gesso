# Gesso

Gesso is a [Sass](http://sass-lang.com/)-based starter theme that outputs
accessible HTML5 markup. It uses a mobile-first responsive approach and
leverages [SMACSS](https://smacss.com/) to organize styles. This encourages a
component-based approach to theming through the creation of discrete, reusable
UI elements. Gesso is heavily integrated with
[Storybook](https://storybook.js.org/) and [Single Directory Components](https://www.drupal.org/docs/develop/theming-drupal/using-single-directory-components), allowing Drupal
and Storybook to share the same markup.

Visit the [Gesso Storybook demo site](https://forumone.github.io/gesso/).

For more information, view the [Gesso Drupal project
page](https://drupal.org/project/gesso/) or [Gesso GitHub
repo](https://github.com/forumone/gesso). To submit bug reports or feature
requests, visit the [Gesso issue
queue](https://github.com/forumone/gesso/issues).

## Global prerequisites

The following packages need to be installed on your system in order to compile
and use Gesso.

-   [Node](https://nodejs.org/en/) version 22. Long-term stable
    recommended.

-   [npm](https://www.npmjs.com/get-npm) version 10.7.0 or greater.

## Installation

1.  Place the Gesso theme in your site’s theme directory. (e.g., themes/gesso)
    Read documentation on [installing
    themes](https://drupal.org/getting-started/install-contrib/themes) for more
    information.

2.  Enable the Gesso Helper module. This module comes packaged with the theme,
    but must be manually enabled for the theme to function.

3.  Install the [Component Libraries](https://www.drupal.org/project/components)
    module. Since many of the Drupal templates reference twig files inside
    Storybook using Twig namespaces, this module is required for the theme to
    function.

4.  Install the [Twig Tweak](https://www.drupal.org/project/twig_tweak) module.

5.  Optional: Install the [Twig Field
    Value](https://www.drupal.org/project/twig_field_value) module. This is not
    required, but it can make working with Twig templates easier. Please note,
    however, that using the `|field_value` Twig filter from this module will
    break Drupal’s QuickEdit functionality.

6.  Optional: Install the [Background Images
    Formatter](https://www.drupal.org/project/bg_image_formatter) module and its
    Responsive Background Images Formatter submodule. This is not required, but
    it will allow you to use images uploaded to Drupal as background images,
    with different image sizes at different breakpoints.

Because Gesso is a starter theme, you may want to rename the Gesso directory or
copy its contents to a new custom theme directory based on the name of your
project.

The easiest way to accomplish this is to use
[Drush](https://github.com/drush-ops/drush). Type `drush help gesso` for more
information. If you get an error that the `gesso` command is not defined, make
sure you have enabled the Gesso Helper module.

If you can’t use Drush, then manually replace all instances of `gesso` within
this directory with a machine-readable name of your choice, including folder
names, filenames, and all occurrences within files. This custom name must start
with a letter and may only contain lowercase letters, numbers, and underscores.

Edit the `.info.yml` file and update the theme name and description. You can
also change the screenshot image (`images/screenshot.png`) shown on the
Appearance admin page.

## Getting started

For development, you can set the theme up as part of a Drupal site or work only
in Storybook. Gesso includes npm tasks to compile design tokens, CSS, JS,
Storybook, and the SVG sprite using [webpack](https://webpack.js.org/).

To use these tasks, first run the following npm command in the theme folder to
install node dependencies.

```shell
npm i
```

To compile the theme, start Storybook, and watch for changes run the following
command in the theme directory:

```shell
npm run dev
```

Open [localhost:6006]() to view Storybook. If you’re using Docker (or some other
container engine) for local development, this might be mapped to a custom domain
or a port on a custom domain such as [storybook.ddev.site]() or [site.ddev.site:6006]().

If you add new SCSS and/or JS files, you will need to restart webpack by
canceling and then re-running `npm run dev`. New files will not be processed
until webpack restarts. Errors will also be shown for duplicate filenames.

To initiate the build tasks only (without watching for changes), run the
following command in the theme directory:

```shell
npm run build
```

## Generating new components

Run `npm run component` to create boilerplate files for a new component. This is
the recommended approach as it will set up basic Twig and Storybook files that
you can modify.

### Interactive mode

Running the command without arguments will prompt you for the component details:

```shell
npm run component
```

### Non-interactive mode

You can also pass arguments to skip the prompts:

```shell
npm run component -- --name my-component --folder components
```

#### Available options

| Option              | Description                                                              |
| ------------------- | ------------------------------------------------------------------------ |
| `--name <name>`     | Component name (required)                                                |
| `--folder <folder>` | SDC location: `components`, `layouts`, or `templates` (required)         |
| `--title <title>`   | Human-readable title (defaults to Capital Case of name)                  |
| `--subfolder <name>`| Optional subfolder within the component location                         |
| `--js`              | Include a JavaScript file                                                |
| `--help, -h`        | Show help message                                                        |

## Directory structure

Gesso organizes its source files across three top-level directories:

-   `components/`: Single Directory Components (SDCs), subdivided by category:
    `components/components/`, `components/layouts/`, and `components/templates/`.
    Each component lives in its own subdirectory and contains all of its files
    (Twig template, SCSS, JS, Storybook story, and the required
    `[component-name].component.yml` metadata file).

-   `source/`: Design tokens and global styles, subdivided by ordered category:
    `source/00-config/` (design tokens, functions, mixins), `source/01-global/`
    (base HTML element styles, fonts, normalize, etc.), and `source/02-utility/`
    (utility classes and JS helpers).

-   `templates/`: Drupal `.html.twig` templates, organized by template type
    (block, content, field, form, etc.). These are standard Drupal theme
    templates and are separate from the Twig files inside `components/`.

Note that the `components/templates/` subdirectory contains SDC Storybook
templates for full-page layouts (page, homepage, landing page, etc.). These are
_not_ Drupal templates — they are SDC components used for node detail pages.

## Storybook

Name your stories files `[component].stories.jsx`. See `menu.stories.jsx` for
an example.

To match Storybook to your site’s branding, change the colors in
`.storybook/manager.js`. Any fonts can be added in
`.storybook/manager-head.html`. See the [Storybook
docs](https://storybook.js.org/docs/react/configure/theming) for more
information about and examples of theming.

### DDEV and allowed hosts

Storybook 10 validates the `Host` header on dev-server requests. When you access
Storybook through the DDEV router (`https://<project-name>.ddev.site:6006`), the
hostname must be allowlisted in `.storybook/main.js`.

By default, Gesso reads `DDEV_HOSTNAME` or `VIRTUAL_HOST` from the environment
(DDEV sets `VIRTUAL_HOST` in the Storybook container) and uses that hostname. If
neither variable is set, any `*.ddev.site` hostname is allowed instead. Access
via `localhost:6006` does not require additional configuration.

If you use a different reverse proxy or custom local domain, add its hostname to
`core.allowedHosts` in `.storybook/main.js`. See the [Storybook `core`
docs](https://storybook.js.org/docs/api/main-config/main-config-core) for
details.

## Sass

Sass can be compiled as part of the global `styles.css` file or to individual
CSS files scoped to a component.

`@use` is used to import Sass variables, mixins, and/or functions into
individual SCSS files. [`@import` is discouraged by the Sass team and will
eventually be phased out.](https://sass-lang.com/documentation/at-rules/import).
This means that most files will start with `@use ‘00-config’ as *;`. This allows
you to use the design token accessor functions without an additional namespace.
Other functions and mixins can be used similarly. Note that to avoid namespace
collisions, only Gesso-related variables, mixins, and functions should be used
with `*`.

All Sass files that are compiled to individual CSS files must have a unique
filename, even if they are in different directories.

### Global styles

Prefix the name of your Sass file with `_`, e.g. `_my-styles.scss`. Place it in
the appropriate subdirectory under `source/01-global/`, then add a `@use` entry
for it in the nearest `_index.scss` file.

### Component styles

Name your component SCSS file `[component-name].source.scss`, e.g.
`button.source.scss`. The `.source.scss` suffix tells the build system to
compile this file to its own CSS file (`button.css`) rather than including it
in the global stylesheet. Import it at the top of your Storybook file. See
`dropdown-menu.stories.jsx` for an example.

Component CSS and JS assets are declared in the component’s
`[component-name].component.yml` file via the `libraryOverrides` key rather
than in `gesso.libraries.yml`. Drupal’s SDC system auto-discovers the
`[component-name].source.scss` and `[component-name].source.js` files. You only
need to declare dependencies, but you must include `gesso/global` as a dependency.

```yaml
libraryOverrides:
  dependencies:
    - gesso/global
    - core/drupal
    - core/once
```

### Sass Linting

Stylelint and Prettier are used to lint CSS and SCSS files. Warnings will
break the build, so if you have a valid reason to break Stylelint rules you can
have it ignore code in two ways:

1.  Add `// stylelint-disable-next-line` to the line just before where the
    Stylelint warning is triggered.

2.  To ignore several lines, add `// stylelint-disable` before the code in
    question and add `// stylelint-enable` afterwards.

In both cases above, please add a comment about the valid reason to disable the
Stylelint rule(s) in your use case.

The Stylelint rules can be changed in the `.stylelintrc.yml` file. By default,
Gesso follows the
[sass-guideline.es](https://github.com/bjankord/stylelint-config-sass-guidelines)
and [Prettier’s recommended
guidelines](https://github.com/prettier/stylelint-config-prettier), with some
additional customizations.

The Prettier config can be changed in the `.prettierrc` file.

## JavaScript

JavaScript can be compiled to individual JS files scoped to a component or
included as a shared utility. JavaScript files should go in the component’s directory under `components/` (e.g.,
`components/components/dropdown-menu/` for dropdown-menu JavaScript).

All JavaScript files must have a unique filename, even if they are in different
directories.

### Modules

Prefix the name of your JavaScript file with `_`, e.g. `_Menu.es6.js`. Place
helper modules in a `modules/` subdirectory inside the component directory.
Import them into the component’s entry point script.

### Individual component/library scripts

Name your component JS entry point `[component-name].source.js`, e.g.
`dropdown-menu.source.js`. DO NOT prefix it with `_`. Import your JS file at the
top of your Storybook file. See `dropdown-menu.stories.jsx` for an example.

As with CSS, component JS assets are auto-discovered by Drupal’s SDC system via
the `[component-name].source.js` filename. Declare dependencies in
`[component-name].component.yml` under `libraryOverrides` rather than adding an
entry to `gesso.libraries.yml`.

### common.js
The common JS file is created using the [Webpack SplitChunksPlugin](https://webpack.js.org/plugins/split-chunks-plugin/).
To change how it behaves, update `webpack.production.js`. You may also need to
update `gesso_library_info_build` in `libraries.inc` to change what files are
included in the `gesso/common` library. We recommend using the default setup
unless you have a specific use case that requires advanced configuration.

`gesso/common` is already a dependency of `gesso/global`, so if you include
`gesso/global` as a dependency of your component (and you should), then it will
be included.

### JS Linting

ESLint and Prettier are used to lint JavaScript files. If you have a valid
reason to break one of the rules, you can ignore a specific line using any of
the options in the [ESLint
documentation](https://eslint.org/docs/user-guide/configuring#disabling-rules-with-inline-comments).

Please add a comment about the valid reason to disable the ESLint rule(s) in
your use case.

The ESLint config can be changed in the `eslint.config.js` file. Gesso follows
the [Forum One JavaScript standards](https://www.npmjs.com/package/@forumone/eslint-config-es5),
which mostly follow the ESLint recommended config. For React files, there are
[additional JSX-specific linting rules](https://www.npmjs.com/package/@forumone/eslint-config-react);

The Prettier config can be changed in the `.prettierrc` file.

### jQuery

Gesso itself does not include any jQuery dependencies and does not ship with
jQuery. However, some Drupal modules still rely on jQuery, so you may need to
add it if, for example, you need to create and trigger a jQuery event.

To add jQuery to Storybook:
1. Install jQuery with `npm i -D jquery @types/jquery`.
2. Add jQuery to `config.externals` in lines 78-82 of `.storybook/main.js`
   ```js
   config.externals = {
      drupal: 'Drupal',
      drupalSettings: 'drupalSettings',
      once: 'once',
      jquery: 'jQuery',
   };
   ```
3. Add a jQuery stub similar to `stubs/once.js` and import it in `.storybook/preview.js`
   ```js
    import jQuery from 'jquery';
    window.jQuery = jQuery;
   ```
   ```js
    import './stubs/jquery.js'
   ```

To add jQuery to Drupal:
1. Add jQuery to `externals` in lines 170-174 of `webpack.common.js`
   ```js
   externals: {
      drupal: 'Drupal',
      drupalSettings: 'drupalSettings',
      once: 'once',
      jquery: 'jQuery'
    }
   ```
2. Ensure that `core/jquery` is added as a dependency in the component's
   `[component-name].component.yml`:
   ```yaml
   libraryOverrides:
     dependencies:
       - gesso/global
       - core/jquery
   ```

You can then import jQuery at the top of a file, the same way `Drupal` and `once`
are typically imported, and use it as needed.

## Design tokens

Gesso uses the configuration file `source/00-config/config.design-tokens.yml` to
manage the theme’s design tokens. The npm build and dev tasks will automatically
generate a global Sass map to easily pull design tokens into individual SCSS
files.

### Functions

The following Sass functions can be used to access the tokens defined in
`config.design-tokens.yml`.

#### `gesso-box-shadow($shadow)`

Output a shadow value from the box-shadow token list.

```scss
box-shadow: gesso-box-shadow(1);
```

#### `gesso-breakpoint($breakpoint)`

Output a size value from the breakpoints token list.

```scss
@include breakpoint(gesso-breakpoint(desktop)) {
  display: flex;
}

@include breakpoint-max(gesso-breakpoint(mobile), true) {
  display: none;
}

@include breakpoint-min-max(
  gesso-breakpoint(mobile),
  gesso-breakpoint(tablet),
  true
) {
  display: block;
}
```

#### `gesso-brand($color, $variant)`

Output a color value from the palette brand token list.

```scss
color: gesso-brand(blue, light);
```

#### `gesso-color($type, $subtype)`

Output a color value from the colors token list.

```scss
color: gesso-color(text, primary);
```

#### `gesso-constrain($constrain)`

Output a size value from the constrains token list.

```scss
max-width: gesso-constrain(sm);
```

#### `gesso-duration($duration)`

Output a timing value from the transitions duration token list.

```scss
transition-duration: gesso-duration(short);
```

#### `gesso-easing($easing)`

Output an easing value from the transitions ease token list.

```scss
transition-timing-function: gesso-easing(ease-in-out);
```

#### `gesso-font-family($family)`

Output a stack value from the font-family token list.

```scss
font-family: gesso-font-family(primary);
```

#### `gesso-font-size($size)`

Output a size value from the font-size token list.

```scss
font-size: rem(gesso-font-size(2));
```

#### `gesso-font-weight($weight)`

Output a weight value from the font-weight token list.

```scss
font-weight: gesso-font-weight(semibold);
```

#### `gesso-grayscale($color)`

Output a color value from the palette grayscale token list.

```scss
color: gesso-grayscale(gray-2);
```

#### `gesso-line-height($height)`

Output a height value from the line-height token list.

```scss
line-height: gesso-line-height(tight);
```

#### `gesso-spacing($spacing)`

Output a size value from the spacing token list.

```scss
margin-bottom: rem(gesso-spacing(md));
```

#### `gesso-z-index($index)`

Output an index value from the z-index token list.

```scss
z-index: gesso-z-index(modal);
```

### Design tokens in JavaScript

The values in Gesso’s configuration file are also exported to JavaScript objects
so that the same values can be used in CSS and JS. The JS objects can be found
in `source/00-config/_GESSO.es6.js`. This file is also rebuilt whenever
`npm run dev` or `npm run build` are run.

For example, to use a breakpoint in a script:

```js
import { BREAKPOINTS } from '../../../00-config/_GESSO.es6';

if (window.matchMedia(`min-width: ${BREAKPOINTS.desktop}`).matches) {
  // Some script that should only run on larger screens.
}
```

This will use the same breakpoint as `breakpoint(gesso-breakpoint(desktop))` in
your Sass.

### Viewport width-based media queries

Gesso uses custom mixins to specify viewport width based media queries:

- `breakpoint`: min-width queries
- `breakpoint-max`: max-width queries
- `breakpoint-min-max`: queries with both a min and max width

Each mixin takes one or two width parameters, which can be a straight value
(e.g., 800px, 40em) or a design token value called using the `gesso-breakpoint`
function (e.g., `gesso-breakpoint(tablet-lg)`). The `breakpoint-max` and
`breakpoint-min-max` mixins can also take an optional parameter to subtract one
pixel from the max-width value, which can be useful when you want your query to
go up to the value but not to include it, such as when using Gesso breakpoint
token values.

#### `@include breakpoint($width) { // styles }`

Output a min-width based media query.

```scss
@include breakpoint(800px) {
  display: flex;
}

@include breakpoint(gesso-breakpoint(desktop)) {
  display: none;
}
```

#### `@include breakpoint-max($width, $subtract_1_from_max) { // styles }`

Output a max-width based media query. The optional `$subtract_1_from_max`
parameter will subtract 1px from the width value if set to `true` (default:
`false`).

```scss
@include breakpoint-max(900px) {
  display: block;
}

@include breakpoint-max(gesso-breakpoint(mobile), true) {
  display: none;
}
```

#### `@include breakpoint-min-max($min-width, $max-width, $subtract_1_from_max) { // styles }`

Output a media query with both a min-width and max-width. The optional
$subtract_1_from_max parameter will subtract 1px from the max-width value if
set to `true` (default: `false`).

```scss
@include breakpoint-min-max(400px, 700px) {
  display: flex;
}

@include breakpoint-min-max(
  gesso-breakpoint(mobile),
  gesso-breakpoint(tablet),
  true
) {
  display: block;
}
```

### Container queries

Gesso uses custom mixins to specify container queries:

- `container-query`: min-width container queries
- `container-query-max`: max-width container queries
- `container-query-min-max`: container queries with both a min and max width

Each mixin takes one or two width parameters, which can be a straight value
(e.g., 800px, 40em) or a design token value called using the `gesso-breakpoint`
function (e.g., `gesso-breakpoint(tablet-lg)`). The `container-max` and
`container-min-max` mixins can also take an optional parameter to subtract one
pixel from the max-width value, which can be useful when you want your query to
go up to the value but not to include it, such as when using Gesso breakpoint
token values.

In order for container queries to work, you need to set a containment context
on a parent element.

```scss
container-type: inline-size;
```

```scss
container: container-name / inline-size;
```

#### `@include container-query($width) { // styles }`

Output a min-width based media query.

```scss
@include container-query(800px) {
  display: flex;
}

@include container-query(gesso-breakpoint(desktop)) {
  display: none;
}
```

#### `@include container-query-max($width, $subtract_1_from_max) { // styles }`

Output a max-width based container query. The optional `$subtract_1_from_max`
parameter will subtract 1px from the width value if set to `true` (default:
`false`).

```scss
@include container-query-max(900px) {
  display: block;
}

@include container-query-max(gesso-breakpoint(mobile), true) {
  display: none;
}
```

#### `@include container-query-min-max($min-width, $max-width, $subtract_1_from_max) { // styles }`

Output a container query with both a min-width and max-width. The optional
$subtract_1_from_max parameter will subtract 1px from the max-width value if
set to `true` (default: `false`).

```scss
@include container-query-min-max(400px, 700px) {
  display: flex;
}

@include container-query-min-max(
  gesso-breakpoint(mobile),
  gesso-breakpoint(tablet),
  true
) {
  display: block;
}
```

## Twig Filters and Functions
Gesso includes some additional filters and functions that can be used in Twig templates.

#### add_attributes
Fork of [Drupal Pattern Lab's `add_attribute` Twig function](https://github.com/drupal-pattern-lab/add-attributes-twig-extension).
Allows Twig templates to add attributes that, in Drupal, will be merged with the Drupal attributes object
while also rendering in Storybook.

```twig
<div {{ add_attributes(
  {
    class: 'your-class-one your-class-two',
    'data-foo': 'bar'
  }
) }}>...</div>
```

#### keysort
Twig filter to sort an object by key alphabetically.

```twig
{% for key, value in your_object|keysort %}
...
{% endfor %}
```

### subheading_level
Twig filter to transform a heading tag to the next level down (h2 -> h3, h3 -> h4, etc.)
Used when the parent heading level can vary but, to maintain accessibility, the component's
heading or subheading should change accordingly.

```twig
{% set subheading_element = title_element|subheading_level %}

<{{ subheading_element|default('h3') }}>...</{{ subheading_element|default('h3') }}>
```

## Building Storybook

A static Storybook site can be built with `npm run build-storybook`. You will
then be able to view Storybook at
[YOUR_URL/themes/gesso/storybook/index.html]().

## Theme settings

Some aspects of Gesso can be configured in the theme settings. These include
the Back to Top component, Breadcrumb options, and Button styles for links.

For the buttons, put the classes that should be added for each button size
and button style on each line, with classes separated with ` .`, similar to how
you would add custom classes to the WYSIWYG editor.

```text
c-button|Primary
c-button.c-button--secondary|Secondary
c-button.c-button--tertiary|Tertiary
```

To use these classes, select **Gesso Button** as the formatter for a link field
under the entity's display settings.

## Contributing

Please use the Github issue queue [https://github.com/forumone/gesso/issues]()
for discussion, bug reports, feature requests, etc.

Submitted pull requests should be against the latest release candidate branch,
such as `5.x-RC`.

## Maintainers

The Gesso theme is maintained by
[Corey Lafferty](https://drupal.org/u/clafferty),
[KJ Monahan](https://www.drupal.org/u/kmonahan),
[Dan Mouyard](https://drupal.org/u/dcmouyard) ([@dcmouyard](https://fosstodon.org/@dcmouyard)), and
[Tommy Alter](https://www.drupal.org/u/tomealter).
