const { promisify } = require('util');
const fs = require('fs');
const nodeGlob = require('glob');
const path = require('path');

const glob = promisify(nodeGlob);
const stat = fs.promises.stat;
const readFile = fs.promises.readFile;

function lintPatternLab() {
  return Promise.all([checkMarkdownFilesExist(), lintMarkdownFiles()]).then(
    results =>
      results
        .reduce((acc, val) => acc.concat(val), [])
        .filter(item => typeof item !== 'undefined')
    )
    .catch(error => [error]);
}

/**
 * @returns {Promise.<Array>} Promise that resolves to an array
 *   of linting errors, if any.
 */
function checkMarkdownFilesExist() {
  return glob('source/_patterns/*/*/**/*.twig').then(matchedFiles => {
    const lintedFiles = [];
    matchedFiles.forEach(file =>
      lintedFiles.push(checkMarkdownFilesExist.lintFile(file))
    );
    return Promise.all(lintedFiles);
  });
}

/**
 * @param {string} file Path to file to lint.
 * @returns {Promise<string>} Promise that resolves to an error message,
 *   if the file does not pass linting. We resolve, rather than reject,
 *   the Promise to allow all errors to be displayed at the end versus
 *   stopping linting at the first error.
 */
checkMarkdownFilesExist.lintFile = function(file) {
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

function lintMarkdownFiles() {
  return glob('source/_patterns/*/**/*.md').then(matchedFiles => {
    const lintedFiles = [];
    matchedFiles.forEach(file =>
      lintedFiles.push(lintMarkdownFiles.lintFile(file))
    );
    return Promise.all(lintedFiles);
  });
}

lintMarkdownFiles.lintFile = function(file) {
  return new Promise((resolve, reject) => {
    return readFile(file)
      .then(fileContents => {
        // Check for YAML front-matter.
        const frontMatterRegex = /^(-{3}[\n\r]([\w\W]+?)[\n\r]-{3})?([\w\W]*)*/;
        const frontMatter = frontMatterRegex.exec(fileContents);
        if (!frontMatter[2]) {
          resolve(`Missing front-matter in ${file}`);
        }
        // Check that title is present.
        const frontMatterContents = frontMatter[2];
        const elementTest = /title: ([\w\W]+)($|[\n\r])/;
        const title = elementTest.exec(frontMatterContents);
        if (!title || !title[1]) {
          resolve(`Missing pattern title in ${file}`);
        }
        // Check that title is capitalized.
        if (title[1].charAt(0) !== title[1].charAt(0).toUpperCase()) {
          resolve(
            `Pattern title '${title[1]}' should be capitalized in ${file}`
          );
        }
        resolve();
      })
      .catch(error => reject(error));
  });
};

module.exports = lintPatternLab;
