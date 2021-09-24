# Gesso Next

Gesso with Storybook and Webpack.

## Getting Started
For development, you can set the theme up as part of a Drupal site
or work only in Storybook.

### Without Docker + Drupal
1. Use Node 14 and npm 7.x. (`nvm use 14` and `npm i -g npm@latest`).
2. Install npm dependencies locally. (`npm i`)
3. Start webpack and Storybook with `npm run dev`.
4. Open `localhost:6006` (it will typically open automatically) to view Storybook.

### With Docker + Drupal
First, update `docker-compose.yml` and `docker-compose.cli.yml` for your project to
change any paths that include `/gesso/` to `/gesso_next/` and to map the
volumes to the paths Gesso Next uses.
docker-composer.yml
```yaml
      - type: volume
        source: fs-data
        target: /var/www/html/web/sites/default/files
        read_only: true
      - &a1
        type: volume
        source: gesso-js
        target: /var/www/html/web/themes/gesso_next/dist/js
      - &a2
        type: volume
        source: gesso-css
        target: /var/www/html/web/themes/gesso_next/dist/css
volumes:
  ? fs-data
  ? mysql-data
  ? gesso-js
  ? gesso-css
```
docker-compose.cli.yml
```yaml
      - type: volume
        source: gesso-js
        target: /app/dist/js
      - type: volume
        source: gesso-css
        target: /app/dist/css
```

1. Run `f1 up`.
2. Run `f1 run --publish 6006:6006 gesso npm run dev`.
3. Open `localhost:6006` to view Storybook and/or `localhost:8080` to view Drupal.
4. Enable Gesso Helper and Components modules before setting the theme to active.

The theme can be set as active in Drupal but is not yet ready for project use.
However, you can use this method if you prefer running Node via Docker or want
to contribute to getting Gesso Next working as Drupal theme.

## Generating New Components
Run `npm run component` (locally) or `f1 run gesso npm run component` (Docker) to
create boilerplate files for a new component. This is the recommended approach as it
will set up a basic Twig and Storybook file that you can modify from there.

## Storybook
Name your stories files `[component].stories.jsx`. See `menu.stories.jsx` for
an example.

## Sass
Sass can be compiled as part of the global styles.css file or to individual CSS files
for use in a Drupal library.

`@use` is used to import Sass variables, mixins, and/or functions into individual SCSS files. [`@import` is discouraged by the Sass team and will eventually be phased out.](https://sass-lang.com/documentation/at-rules/import).
This means that most files will start with `@use 00-config/functions/gesso as *`. This allows you to use the
design token accessor functions without an additional namespace. Other functions and mixins can be used similarly. Note that to avoid namespace
collisions, only Gesso-related variables, mixins, and functions should be used with `*`.

### Global Styles
Prefix the name of your Sass file with `_`, e.g. `_card.scss`. Add it to the appropriate
aggregate file (i.e. `_components.scss`).

### Individual Component/Library Styles
DO NOT prefix the name of your Sass file with `_`, e.g. `menu.scss`. Import the config
and global aggregate files. Import your SCSS file at the top of your Storybook file.
See `menu.stories.jsx` for an example. Don't forget to add it to the `gesso_next.libraries.yml`
file as well.

### Linting
Stylelint and Prettier are used to lint CSS and SCSS files.

## JavaScript
JavaScript can be compiled to individual JS files for use in a JavaScript library or included
within a different JS file. JS files that use modern (ES2015+) syntax must be named
`[name].es6.js`, but this is not required by the compiler. JavaScript files should go in the
appropriate folder under source (e.g. `source/03-components/menu` for menu-related JavaScript).
There is not a separate folder for JS files as there was in previous versions of Gesso.

### Modules
Prefix the name of your JavaScript file with `_`, e.g. `_Menu.es6.js`. Import it to the appropriate
JavaScript file(s), (i.e. `primary-menu.es6.js`).

### Individual Component/Library Scripts
DO NOT prefix the name of your JS file with `_`. Import your JS file at the top
of your Storybook file. See `menu.stories.jsx` for an example. Don't forget to
add it to the `gesso_next.libraries.yml` file as well.

### Linting
ESLint and Prettier are used to lint JavaScript files. ESLint uses the [Airbnb
standards](https://github.com/airbnb/javascript/), which are [followed by Drupal](https://www.drupal.org/docs/develop/standards/javascript/javascript-coding-standards) as well.
