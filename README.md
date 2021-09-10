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
1. Update `docker-compose.yml` and `docker-compose.cli.yml` for your project to change any paths that include `/gesso/` to `/gesso-next/`.
2. Run `f1 up`.
3. Run `f1 run --publish 6006:6006 gesso npm run dev`.
4. Open `localhost:6006` to view Storybook and/or `localhost:8080` to view Drupal.

Setting the theme as active in Drupal has not been testing yet and probably will not work.
However, you can use this method if you prefer running Node via Docker or want to contribute
to getting Gesso Next working as Drupal theme.

### Notes/Known Issues
When you first run Webpack, you will probably see some errors about _GESSO not existing.
These can be ignored for the time being.

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
See `menu.stories.js` for an example. Don't forget to add it to the `gesso-next.libraries.yml`
file as well.
