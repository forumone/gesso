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

### Global Styles
Prefix the name of your Sass file with `_`, e.g. `_card.scss`. Add it to the appropriate
aggregate file (i.e. `_components.scss`). (This step is necessary because Sass globbing
is not yet in place).

### Individual Component/Library Styles
DO NOT prefix the name of your Sass file with `_`, e.g. `menu.scss`. Import the config
and global aggregate files. Import your SCSS file at the top of your Storybook file.
See `menu.stories.js` for an example.
