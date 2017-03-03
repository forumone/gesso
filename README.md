# Gesso

Gesso is a [Sass](http://sass-lang.com/)-based starter theme that outputs
accessible HTML5 markup. It uses a mobile-first responsive approach and
leverages [SMACSS](https://smacss.com/) to organize styles as outlined in the
[Drupal 8 CSS architecture guidelines](https://www.drupal.org/node/1887918).
This encourages a component-based approach to theming through the creation of
discrete, reusable UI elements.

For more information, view the
[Gesso Drupal project page](https://drupal.org/project/gesso/) or [Gesso GitHub repo](https://github.com/forumone/gesso).
To submit bug reports or feature requests, visit the
[Gesso issue queue](https://github.com/forumone/gesso/issues).


## Installation

1.  Place the Gesso theme in your site’s theme directory.
    (e.g., themes/gesso) Read documentation on
    [installing themes](https://drupal.org/getting-started/install-contrib/themes)
    for more information.

2.  Because Gesso is a starter theme, it may be best to rename the Gesso
    directory or copy its contents to a new custom theme directory based on the
    name of your project.

    The easiest way to accomplish this is to use [Drush](https://github.com/drush-ops/drush).
    Type `drush gesso --help` for more information.

    If you can’t use Drush, then manually replace all instances of 'gesso'
    within this directory with a machine-readable name of your choice, including
    folder names, filenames, and all occurrences within files. This custom name
    must start with a letter and may only contain lowercase letters, numbers,
    and underscores.

3.  Edit the .info.yml file and update the theme name and description. You can also
    change the screenshot image (images/screenshot.png) shown on the Appearance
    admin page.


## Configuration

Gesso includes several theme-specific settings for managing classes output by
Drupal, which you can change at admin/appearance/settings/gesso.


### Pattern Lab installation

The included Grunt/Gulp tasks look for an instance of Pattern Lab with the
[Gesso Twig starter kit](https://github.com/forumone/starterkit-twig-drupal-gesso)
in a subdirectory of the theme called 'pattern-lab'. The Grunt/Gulp build tasks will
skip building Pattern Lab if this directory is not found.

To install Pattern Lab, run the following Composer command in
the theme directory.

```
$ composer create-project pattern-lab/edition-drupal-standard pattern-lab
```

When prompted, always choose `r` to replace existing files and select `4: forumone/starterkit-twig-drupal-gesso` as the starterkit.


### Grunt/Gulp installation

The Gesso theme comes with the option to use either [Grunt](http://gruntjs.com/)
or [Gulp](http://gulpjs.com/) to run automated tasks.

Copy the `package.grunt.json` or `package.gulp.json` file and rename it to
`package.json`, depending on whether you want to use Grunt or Gulp.

Run the following [npm](https://www.npmjs.com/) command in the theme folder:

```
$ npm install
```

Windows users may need to include the `--no-bin-links` flag at the end of the
command.


## Grunt tasks

To run the default Grunt task, run:

```
$ grunt
```


### Grunt dependencies

* [Autoprefixer](https://github.com/postcss/autoprefixer): Adds necessary
browser CSS property prefixes during Sass compilation.

* [Sass Globbing](https://github.com/DennisBecker/grunt-sass-globbing): Adds
glob-based imports to Sass.

* [SVG2PNG](https://github.com/dbushell/grunt-svg2png): Rasterizes SVG to PNG
images using PhantomJS.


## Gulp tasks

To run the default Gulp task, run:

```
$ gulp
```

The default task will run the build task and watch files for changes. The build
task will install any required Bower dependencies, optimize the images in
`images/` using lossless compression, compile the Sass files into CSS using
[LibSass](http://sass-lang.com/libsass), minify the compiled CSS, compile
Pattern Lab, and minify the JS files in `js/`.

The watch task will:
* start up browser sync
* lint (using stylelint) and compile any new or changed Sass files in `sass/`
* lint (using eslint) and minify any new or changed JS files in `js/`
* create PNG fallback images for any new or changed SVG files in `images/bg/`
* optimize any new or changed images in `images/`
* compile Pattern Lab when changes are made to `pattern-lab/source/`
* clear the Drupal 8 cache when changes are made to `templates/`

You can also get a report of filesizes for CSS, images, and JS files by running:

```
$ gulp report
```

For a detailed list of all tasks, check out `gulpfile.js`.


### Gulp dependencies

* [Autoprefixer](https://github.com/postcss/autoprefixer): Adds necessary
browser CSS property prefixes during Sass compilation.

* [Browsersync](https://browsersync.io/): Adds live-reloading and mirroring of
clicks, scrolling, form elements, and form submissions across multiple devices.

* [CSSNano](http://cssnano.co/): Adds minification of CSS files.

* [ESLint](http://eslint.org/): Adds JavaScript linting.

* [imagemin](https://github.com/imagemin/imagemin): Adds lossless image
optimization.

* [StyleLint](http://stylelint.io/): Adds Sass linting.

* [Uglify](http://lisperator.net/uglifyjs/): Adds minification of JS files.


## Build Artifacts

By default, the compiled Pattern Lab and Sass files (e.g., `pattern-lab/public/`
and `css/`) are ignored by Git as these files are built during deployment.
To change this, edit the included `.gitignore` file.


## Sass dependencies

* [Breakpoint](http://breakpoint-sass.com): Easy to write media queries.

* [Sass](http://sass-lang.com): CSS on steroids. Adds nested rules, variables,
mixins, selector inheritance, and more.


## Maintainers

The Gesso theme is maintained by [Dan Mouyard](https://drupal.org/u/dcmouyard)
([@dcmouyard](http://twitter.com/dcmouyard)) and
[Corey Lafferty](https://drupal.org/u/clafferty)
([@coreylafferty](http://twitter.com/coreylafferty)).

Please use the Github issue queue: https://github.com/forumone/gesso/issues
