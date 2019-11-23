'use strict';

const PluginError = require('plugin-error');
const { Transform } = require('stream');
const path = require('path');
const { existsSync } = require('fs');

function lintPatternLab() {
  const transform = (file, enc, cb) => {
    const fileName = path.basename(file.path, '.twig');
    if (fileName.charAt(0) === '_') {
      cb(null, file);
      return;
    }
    const markdownPath = path.join(path.dirname(file.path), `${fileName}.md`);
    if (!existsSync(markdownPath)) {
      cb(
        new PluginError(
          'lintPatternLab',
          `Missing markdown file for ${path.relative(process.cwd(), file.path)}`
        )
      );
      return;
    }
    cb(null, file);
    return;
  };
  return new Transform({
    objectMode: true,
    transform,
  });
}

module.exports = lintPatternLab;
