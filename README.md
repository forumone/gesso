# Gesso

Gesso is a [Sass](http://sass-lang.com/)-based and [Pattern Lab](https://patternlab.io)
integrated starter theme that outputs accessible HTML5 markup. It uses a
mobile-first responsive approach and leverages [SMACSS](https://smacss.com/) to
organize styles as outlined in the [Drupal 8 CSS architecture guidelines](https://www.drupal.org/node/1887918).
This encourages a component-based approach to theming through the creation of
discrete, reusable UI elements. Gesso is heavily integrated with
[Pattern Lab](http://patternlab.io/) and the
[Component Libraries](https://www.drupal.org/project/components) module,
allowing Drupal and Pattern Lab to share the same markup.

For more information, view the
[Gesso Drupal project page](https://drupal.org/project/gesso/) or
[Gesso GitHub repo](https://github.com/forumone/gesso).
To submit bug reports or feature requests, visit the
[Gesso issue queue](https://github.com/forumone/gesso/issues).
Also available for [WordPress](https://github.com/forumone/gesso-wp).

## Global Prerequisites

The following packages need to be installed on your system in order to use
Gesso.

- [npm](https://www.npmjs.com/get-npm)
- [gulp](https://gulpjs.com/docs/en/getting-started/quick-start)

In addition, in order to compile Twig files, Pattern Lab requires that PHP be
available on the command line.

## Installation

1. Place the Gesso theme in your site’s theme directory. (e.g.,
   themes/gesso) Read documentation on
   [installing themes](https://drupal.org/getting-started/install-contrib/themes)
   for more information.

2. Install the
   [Component Libraries](https://www.drupal.org/project/components) module.
   Since many of the Drupal templates reference twig files inside Pattern Lab
   using Twig namespaces, this module is required for the theme to function.

3. Enable the Gesso Helpers module. This module comes packaged with the theme,
   but must be manually enabled for the theme to function.

4. Optional: Install the
   [Twig Field Value](https://www.drupal.org/project/twig_field_value) module.
   This is not required, but will make working with Twig templates easier.

5. Optional: Install the
   [Twig Tweak](https://www.drupal.org/project/twig_tweak) module.
   This is not required, but will make working with Twig templates easier.

6. Optional: Because Gesso is a starter theme, you may want to rename the
   Gesso directory or copy its contents to a new custom theme directory based on
   the name of your project.

The easiest way to accomplish this is to use
[Drush](https://github.com/drush-ops/drush).
Type `drush help gesso` for more information. If you get an error that the
`gesso` command is not defined, make sure you have enabled the Gesso Helper
module.

If you can’t use Drush, then manually replace all instances of `gesso`
within this directory with a machine-readable name of your choice, including
folder names, filenames, and all occurrences within files. This custom name must
start with a letter and may only contain lowercase letters, numbers, and
underscores.

Edit the .info.yml file and update the theme name and description. You can also
change the screenshot image (images/screenshot.png) shown on the Appearance
admin page.

### Compiling Pattern Lab and Sass

[LibSass](http://sass-lang.com/libsass) is required to compile the Sass into
CSS. Gesso includes Gulp tasks to compile the CSS and generate the compiled
Pattern Lab files and to watch both for changes. To use these tasks, first run
the following NPM command in the theme folder.

```
npm install
```

To initiate the Gulp build tasks that compile the Sass and Pattern Lab files and
watch for changes, run the following command in the theme directory:

```
gulp
```

To initiate the Gulp build tasks only (without watching for changes), run the following command in the theme directory:

```
gulp build
```

### Accessing Pattern Lab

To access the Pattern Lab instance, append `/pattern-lab/index.html` to your
site URL and theme directory (e.g. http://localhost:8080/themes/gesso/pattern-lab/index.html)
or, if developing locally, just open that index.html file directly in the
browser from your file system.

### Design Tokens

Gesso uses a configuration file `source/\_patterns/00-config/config.design-tokens.yml`
to manage the theme’s design tokens and automatically generate the global sass
map for styling and patterns to represent the theme’s design tokens. The default
gulp command will monitor changes in the config and rebuild all necessary
assets. To rebuild the theme assets a single time run `gulp build`

#### Design Token Colors

In addition to using hex values for colors, you can also use Sass functions and
provide a fallback hex value to be used in Pattern Lab. This is useful when
pulling in an external design system, such as [USWDS](https://designsystem.digital.gov/).

For example:

```
gesso:
  palette:
    brand:
      blue:
        base: '#0071bc'
        light: !sass
          sass: 'lighten(#0071bc, 20%)'
          fallback: '#23a7ff'
```

#### Design Token Functions

The following Sass functions can be used to access the tokens defined in `config.design-tokens.yml`.

**`gesso-box-shadow($shadow)` Output a shadow value from the box-shadow token list**

example:

```
box-shadow: gesso-box-shadow(1);
```

**`gesso-breakpoint($breakpoint)` Output a size value from the breakpoints token list**

example:

```
@include breakpoint(gesso-breakpoint(lg)) {
  display: flex;
}
```

**`gesso-brand($color, $variant)` Output a color value from the palette brand token list**

example:

```
color: gesso-brand(blue, light);
```

**`gesso-color($type, $subtype)` Output a color value from the colors token list**

example:

```
color: gesso-color(text, primary);
```

**`gesso-constrain($constrain)` Output a size value from the constrains token list**

example:

```
max-width: gesso-constrain(sm);
```

**`gesso-duration($duration)` Output a timing value from the transitions duration token list**

example:

```
transition-duration: gesso-duration(short);
```

**`gesso-easing($easing)` Output an easing value from the transitions ease token list**

example:

```
transition-timing-function: gesso-easing(ease-in-out);
```

**`gesso-font-family($family)` Output a stack value from the font-family token list**

example:

```
font-family: gesso-font-family(primary);
```

**`gesso-font-size($size)` Output a size value from the font-size token list**

example (combined with the rem() function to convert to rems):

```
font-size: rem(gesso-font-size(2));
```

**`gesso-font-weight($weight)` Output a weight value from the font-weight token list**

example:

```
font-weight: gesso-font-weight(semibold);
```

**`gesso-grayscale($color)` Output a color value from the palette grayscale token list**

example:

```
color: gesso-grayscale(gray-2);
```

**`gesso-line-height($height)` Output a height value from the line-height token list**

example:

```
line-height: gesso-line-height(tight);
```

**`gesso-spacing($spacing)` Output a size value from the spacing token list**

example (combined with the rem() function to convert to rems):

```
margin-bottom: rem(gesso-spacing(md));
```

**`gesso-z-index($index)` Output an index value from the z-index token list**

example:

```
z-index: gesso-z-index(modal);
```

### Creating New Components

Gesso includes a script to generate new component files. To use, run the
following command in the theme folder.

```
npm run component
```

### Build Artifacts

By default, the compiled Pattern Lab and Sass files (e.g., /pattern-lab/
and /css/\*.css) as well as some configuration artifacts (e.g., design-tokens.artifact.yml,
\_design-tokens.artifact.scss) are ignored by Git as these files are generated
when the Gulp tasks run. To change this, edit the included `.gitignore` file.

### Sass/Gulp dependencies

- [Breakpoint](http://breakpoint-sass.com): Easy to write media queries.

- [Sass](http://sass-lang.com): CSS on steroids. Adds nested rules, variables,
  mixins, selector inheritance, and more.

- [Sass Globbing](https://github.com/mikevercoelen/gulp-sass-glob): Adds
  glob-based imports to Sass.

- [Autoprefixer](https://github.com/postcss/autoprefixer): Adds necessary
  browser CSS property prefixes during Sass compilation.

### Stylelint

[Stylelint](https://stylelint.io/) is used to lint Sass files. Warnings will
break the build, so if you have a valid reason to break Stylelint rules you can
have it ignore code in two ways:

1. Add `/* stylelint-disable-next-line */` to the line just before where the
   Stylelint warning is triggered.

2. To ignore several lines, add `/* stylelint-disable */` before the code in
   question and add `/* stylelint-enable */` afterwards.

### JavaScript

See the README.md file in the /js directory for details on included scripts
(e.g., mobile menu, primary menu, etc.).

## Maintainers

The Gesso theme is maintained by [Dan Mouyard](https://drupal.org/u/dcmouyard)
([@dcmouyard](http://twitter.com/dcmouyard)),
[Shawn Brackat](https://drupal.org/u/bkny_139)
([@shawnbrackat](http://twitter.com/shawnbrackat)) and
[Corey Lafferty](https://drupal.org/u/clafferty)
([@coreylafferty](http://twitter.com/coreylafferty)).

Please use the Github issue queue: https://github.com/forumone/gesso/issues
