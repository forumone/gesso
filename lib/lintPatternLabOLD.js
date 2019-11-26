'use strict';

const PluginError = require('plugin-error');
const { Transform } = require('stream');
const path = require('path');
const { existsSync } = require('fs');
const log = require('fancy-log');

function lintPatternLab() {
  const transform = (file, enc, cb) => {
    const fileName = path.basename(file.path, '.twig');
    let errorCount = 0;
    if (fileName.charAt(0) === '_') {
      cb(null, file);
      return;
    }
    const markdownPath = path.join(path.dirname(file.path), `${fileName}.md`);
    if (!existsSync(markdownPath)) {
      log.error(
        `Missing markdown file for ${path.relative(process.cwd(), file.path)}`
      );
      errorCount++;
    }
    file.patternLabErrorCount = errorCount;
    cb(null, file);
  };
  return new Transform({
    objectMode: true,
    transform,
  });
}

lintPatternLab.results = function(action) {
  let totalErrors = 0;
  const transform = (file, enc, cb) => {
    if (typeof file.patternLabErrorCount !== 'undefined') {
      totalErrors += file.patternLabErrorCount;
    }
    cb(null, file);
  };
  const flush = done => {
    action(totalErrors);
    done();
  };
  return new Transform({
    objectMode: true,
    transform,
    flush,
  });
};

lintPatternLab.failAfterErrors = () => {
  return lintPatternLab.results(totalErrorCount => {
    if (totalErrorCount > 0) {
      throw new PluginError('lintPatternLab', {
        name: 'Pattern Lab Linting Error',
        message: `Failed with ${totalErrorCount} error(s)`,
      });
    }
  });
};

module.exports = lintPatternLab;
