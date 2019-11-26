const { promisify } = require('util');
const fs = require('fs');
const nodeGlob = require('glob');
const path = require('path');

const glob = promisify(nodeGlob);
const stat = promisify(fs.stat);

/**
 * @returns {Promise.<Array>} Promise that resolves to an array
 *   of linting errors, if any.
 */
function lintPatternLab() {
  return glob('source/_patterns/*/*/**/*.twig')
    .then(matchedFiles => {
      const lintedFiles = [];
      matchedFiles.forEach(file =>
        lintedFiles.push(lintPatternLab.lintFile(file))
      );
      return Promise.all(lintedFiles);
    })
    .then(data => data.filter(item => typeof item !== 'undefined'));
}

/**
 * @param {string} file Path to file to lint.
 * @returns {Promise<string>} Promise that resolves to an error message,
 *   if the file does not pass linting. We resolve, rather than reject,
 *   the Promise to allow all errors to be displayed at the end versus
 *   stopping linting at the first error.
 */
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
