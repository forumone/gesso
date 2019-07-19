'use strict';

const { dest, lastRun, parallel, series, src, watch } = require('gulp');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const sassGlob = require('gulp-sass-glob');
const stylelint = require('gulp-stylelint');
const postcss = require('gulp-postcss');
const config = require('./patternlab-config.json');
const patternlab = require('@pattern-lab/core')(config);

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
    .pipe(sass({
      includePaths: ['./node_modules/breakpoint-sass/stylesheets'],
      precision: 10
    }))
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
  return patternlab.build({cleanPublic: true, watch: false});
}

function fileWatch() {
  watch(
    ['source/**/*.scss', 'images/*.svg'],
    { usePolling: true, interval: 1500 },
    series(
      lintStyles,
      buildStyles
    ),
  );
  watch(
    'source/**/*.{twig,json,yaml,yml,md}',
    { usePolling: true, interval: 1500 },
    buildPatternlab
  );
}

const gessoBuildPatternlab = exports.gessoBuildPatternlab = buildPatternlab;
const gessoBuildStyles = exports.gessoBuildStyles = series(lintStyles, buildStyles);
const gessoBuild = exports.gessoBuild = parallel(gessoBuildStyles, gessoBuildPatternlab);
const gessoWatch = exports.gessoWatch = fileWatch;

exports.default = series(
  gessoBuild,
  gessoWatch
);
