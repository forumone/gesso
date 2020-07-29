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

/**
 *
 * @returns {Promise.<Array>} Promise that resolves to an array
 *   of linting errors, if any.
 */
function lintMarkdownFiles() {
  return glob('source/_patterns/*/**/*.md').then(matchedFiles => {
    const lintedFiles = [];
    matchedFiles.forEach(file =>
      lintedFiles.push(lintMarkdownFiles.lintFile(file))
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
        // Check that Variables section is formatted correctly.
        if (fileContents.indexOf('Variables') !== -1) {
          // Check that heading uses the correct heading.
          if (fileContents.indexOf('__Variables:__') === -1) {
            resolve(
              `Variables heading in ${file} must be formatted as __Variables:__`
            );
          }
          // Check that variables list uses correct syntax.
          const variablesTest = /__Variables:__\s*(?:\r|\n|\r\n)((?:\s*\t*\*.+((?:\r|\n|\r\n)|\.))+)/;
          const variableLineTest = /\* ([^:]+): \[([^\]]+)\] (.*)/;
          const variablesResults = variablesTest.exec(fileContents);
          if (variablesResults[1]) {
            const variables = variablesResults[1].split(/\r?\n/);
            variables.forEach(line => {
              const trimmedLine = line.trim();
              if (trimmedLine !== '') {
                const variableLine = variableLineTest.exec(trimmedLine);
                if (variableLine) {
                  if (
                    variableLine[3].charAt(0) !==
                    variableLine[3].charAt(0).toUpperCase()
                  ) {
                    resolve(
                      `Documentation '${trimmedLine}' does not follow coding standards. It should use the format\n* variable_name: [type] A description starting with a capital letter.`
                    );
                  }
                } else {
                  resolve(
                    `Documentation '${trimmedLine}' does not follow coding standards. It should use the format\n* variable_name: [type] A description starting with a capital letter.`
                  );
                }
              }
            });
          }
        }
        resolve();
      })
      .catch(error => reject(error));
  });
};

module.exports = lintPatternLab;
