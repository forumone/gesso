// @ts-check

'use strict';

const fs = require('fs');
const { fromArray, NaniError } = require('nani');
const util = require('util');
const YAML = require('yaml');

const readFile = util.promisify(fs.readFile);

const CodeMap = require('./CodeMap');

/**
 * @param {string} sourcePath
 * @returns {Promise.<import('./types').ParsedSource>}
 */
async function readSource(sourcePath) {
  const source = await readFile(sourcePath, 'utf-8');
  const map = new CodeMap(source);

  const ast = YAML.parseDocument(source);
  if (ast.errors && ast.errors.length) {
    const max = Math.min(ast.errors.length, 10);
    const errors = ast.errors.slice(0, max).map(yamlError => {
      const { start, end } = yamlError.source.range;
      return map.errorForRange('YAML error', [start, end], yamlError);
    });

    throw fromArray(errors);
  }

  return {
    path: sourcePath,
    source,
    ast,
    map,
  };
}

module.exports = readSource;
