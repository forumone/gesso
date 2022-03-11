# Gesso

Gesso is a [Sass](http://sass-lang.com/)-based starter theme that outputs
accessible HTML5 markup. It uses a mobile-first responsive approach and
leverages [SMACSS](https://smacss.com/) to organize styles. This encourages a
component-based approach to theming through the creation of discrete, reusable
UI elements. Gesso is heavily integrated with
[Storybook](https://storybook.js.org/) and the [Component
Libraries](https://www.drupal.org/project/components) module, allowing Drupal
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

-   [Node](https://nodejs.org/en/) version 14.x.x or greater. Long-term stable
    recommended.

-   [npm](https://www.npmjs.com/get-npm) version 7.x.x or greater.

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

## Storybook

Name your stories files `[component].stories.jsx`. See `menu.stories.jsx` for
an example.

To match Storybook to your site’s branding, change the colors in
`.storybook/manager.js`. Any fonts can be added in
`.storybook/manager-head.html`. See the [Storybook
docs](https://storybook.js.org/docs/react/configure/theming) for more
information about and examples of theming.

## Sass

Sass can be compiled as part of the global styles.css file or to individual CSS
files for use in a Drupal library.

`@use` is used to import Sass variables, mixins, and/or functions into
individual SCSS files. [`@import` is discouraged by the Sass team and will
eventually be phased out.](https://sass-lang.com/documentation/at-rules/import).
This means that most files will start with `@use '00-config' as *;`. This allows
you to use the design token accessor functions without an additional namespace.
Other functions and mixins can be used similarly. Note that to avoid namespace
collisions, only Gesso-related variables, mixins, and functions should be used
with `*`.

All Sass files that are compiled to individual CSS files must have a unique
filename, even if they are in different directories.

### Global styles

Prefix the name of your Sass file with `_`, e.g. `_card.scss`. Add it to the
appropriate aggregate file (i.e. `_components.scss`).

### Individual component/library styles

DO NOT prefix the name of your Sass file with `_`, e.g. `menu.scss`. Import the
config and global aggregate files. Import your SCSS file at the top of your
Storybook file. See `dropdown-menu.stories.jsx` for an example. Don’t forget to
add it to the `gesso.libraries.yml` file as well.

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

JavaScript can be compiled to individual JS files for use in a JavaScript
library or included within a different JS file. JS files that use modern
(ES2015+) syntax must be named `[name].es6.js`, but this is not required by the
compiler. JavaScript files should go in the appropriate folder under source
(e.g., `source/03-components/menu` for menu-related JavaScript). There is not a
separate folder for JS files as there was in previous versions of Gesso.

All JavaScript files must have a unique filename, even if they are in different
directories.

### Modules

Prefix the name of your JavaScript file with `_`, e.g. `_Menu.es6.js`. Import it
to the appropriate JavaScript file(s), (i.e. `primary-menu.es6.js`).

### Individual component/library scripts

DO NOT prefix the name of your JS file with `_`. Import your JS file at the top
of your Storybook file. See `dropdown-menu.stories.jsx` for an example. Don’t
forget to add it to the `gesso.libraries.yml` file as well.

### JS Linting

ESLint and Prettier are used to lint JavaScript files. If you have a valid
reason to break one of the rules, you can ignore a specific line using any of
the options in the [ESLint
documentation](https://eslint.org/docs/user-guide/configuring#disabling-rules-with-inline-comments).

Please add a comment about the valid reason to disable the ESLint rule(s) in
your use case.

The ESLint config can be changed in the `.eslintrc.js` file. Gesso follows the
[Airbnb standards](https://github.com/airbnb/javascript/), which are [followed
by Drupal](https://www.drupal.org/docs/develop/standards/javascript/javascript-coding-standards)
as well.

The Prettier config can be changed in the `.prettierrc` file.

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

### Width-based media queries

Gesso uses custom mixins to specify viewport width based media queries:
-   `breakpoint`: min-width queries
-   `breakpoint-max`: max-width queries
-   `breakpoint-min-max`: queries with both a min and max width

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
[Corey Lafferty](https://drupal.org/u/clafferty) ([@coreylafferty](http://twitter.com/coreylafferty)),
[KJ Monahan](https://www.drupal.org/u/kmonahan), and
[Dan Mouyard](https://drupal.org/u/dcmouyard) ([@dcmouyard](http://twitter.com/dcmouyard)).
