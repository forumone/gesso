const { promisify } = require('util');
const fs = require('fs');
const glob = require('glob');
const path = require('path');

const asyncGlob = promisify(glob);
const stat = promisify(fs.stat);

function lintPatternLab(options) {
  return asyncGlob('source/_patterns/*/*/**/*.twig')
    .then(matchedFiles => {
      const lintedFiles = [];
      matchedFiles.forEach(file =>
        lintedFiles.push(lintPatternLab.lintFile(file))
      );
      return Promise.all(lintedFiles);
    })
    .then(data => data.filter(item => typeof item !== 'undefined'));
}

lintPatternLab.lintFile = function(file) {
  return new Promise((resolve, reject) => {
    const fileName = path.basename(file, '.twig');
    if (fileName.charAt(0) === '_') {
      resolve();
    }
    const markdownPath = path.join(path.dirname(file), `${fileName}.md`);
    return stat(markdownPath)
      .then(() => resolve())
      .catch(() =>
        resolve(
          `Missing markdown file for ${path.relative(process.cwd(), file)}`
        )
      );
  });
};

module.exports = lintPatternLab;
