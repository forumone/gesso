'use strict';

const { watch, dest, src, series, parallel } = require('gulp');

const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const sassGlob = require('gulp-sass-glob');
const postcss = require('gulp-postcss');

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

const del = require('del');

function cleanPatternlab() {
  return del([
    'pattern-lab/public',
  ]);
}

const config = require('./patternlab-config.json');
const patternlab = require('@pattern-lab/core')(config);

function buildPatternlab() {
  return patternlab.build({ cleanPublic: true, watch: false });
}

function fileWatch() {
  watch(
    ['source/**/*.scss', 'images/*.svg'],
    { usePolling: true, interval: 1500 },
    buildStyles
  );

  watch(
    'source/**/*.{twig,json,yaml,yml}',
    { usePolling: true, interval: 1500 },
    series(
      cleanPatternlab,
      buildPatternlab
    ),
  );
}

exports.gessoBuildStyles = buildStyles;

exports.gessoBuildPatternlab = series(
  cleanPatternlab,
  buildPatternlab
);

exports.gessoBuild = series(
  buildStyles,
  cleanPatternlab,
  buildPatternlab
);

exports.default = series(
  buildStyles,
  cleanPatternlab,
  buildPatternlab,
  fileWatch
);


// use strict?
// requires outside functions?
// const breakpointIncludePath?
// series / parallel?
// errors / showing output of tasks?
// separate files?
