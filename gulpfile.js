'use strict';

const { watch, lastRun, dest, src, series, parallel } = require('gulp');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const sassGlob = require('gulp-sass-glob');
const stylelint = require('gulp-stylelint');
const postcss = require('gulp-postcss');
const config = require('./patternlab-config.json');
const patternlab = require('@pattern-lab/core')(config);
const yaml = require('yaml');

const fs = require('fs');
const path = require('path');
const util = require('util');

const readSource = require('./lib/readSource');
const transform = require('./lib/transform');
const renderSass = require('./lib/renderSass');

const writeFile = util.promisify(fs.writeFile);

async function themeCompile() {
  const scssDir = path.join(__dirname, '/source/_patterns/config');
  const ymlDir = path.join(__dirname, './source/_data');

  const parsed = await readSource(
    path.join(__dirname, './source/gesso-theme-config.yml'),
  );
  const plData = await readSource(
    path.join(__dirname, './source/_data/data_pl.yml'),
  );

  const transformed = transform(parsed);

  const sass = renderSass(transformed.data);

  await Promise.all([
    writeFile(
      path.join(ymlDir, 'data.yml'),
      plData.source + yaml.stringify(transformed.data),
    ),
    writeFile(path.join(scssDir, '_gesso-theme.scss'), sass),
  ]);
}

function lintStyles() {
  return src('**/*.scss', { cwd: './source', since: lastRun(lintStyles) }).pipe(
    stylelint({
      configFile: '.stylelintrc.yml',
      failAfterError: true,
      reporters: [{ formatter: 'string', console: true }],
    }),
  );
}

function buildStyles() {
  return src('*.scss', { cwd: './source' })
    .pipe(sassGlob())
    .pipe(sourcemaps.init())
    .pipe(
      sass({
        includePaths: ['./node_modules/breakpoint-sass/stylesheets'],
        precision: 10,
      }),
    )
    .pipe(
      postcss([
        require('postcss-assets')(),
        require('autoprefixer')({
          remove: false,
        }),
      ]),
    )
    .pipe(sourcemaps.write('.'))
    .pipe(dest('css'));
}

function buildPatternlab() {
  return patternlab.build({ cleanPublic: true, watch: false });
}

function fileWatch() {
  watch(
    [
      'source/**/*.scss',
      'images/*.svg',
      '!source/_patterns/config/_gesso-theme.scss',
    ],
    { usePolling: true, interval: 1500 },
    series(lintStyles, buildStyles),
  );
  watch(
    ['source/gesso-theme-config.yml'],
    { usePolling: true, interval: 1500 },
    series(
      themeCompile,
      parallel(
        series(lintStyles, buildStyles),
        buildPatternlab,
      ),
    ),
  );
  watch(
    ['source/**/*.{twig,json,yaml,yml}', '!source/gesso-theme-config.yml'],
    { usePolling: true, interval: 1500 },
    buildPatternlab,
  );
}

const gessoBuildPatternlab = (exports.gessoBuildPatternlab = buildPatternlab);
const gessoBuildStyles = (exports.gessoBuildStyles = series(
  lintStyles,
  buildStyles,
));
const gessoBuild = (exports.gessoBuild = parallel(
  gessoBuildStyles,
  gessoBuildPatternlab,
));

const gessoReTheme = (exports.gessoReTheme = series(themeCompile, gessoBuild));

const gessoWatch = (exports.gessoWatch = fileWatch);

exports.default = series(themeCompile, gessoBuild, gessoWatch);
