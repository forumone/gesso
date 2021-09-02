// @ts-check

"use strict";

const fs = require("fs");
const { fromArray, NaniError } = require("nani");
const util = require("util");
const YAML = require("yaml");

const CodeMap = require("./CodeMap");
const SassValue = require("./SassValue");

/**
 * @param {string} sourcePath
 * @returns {Promise.<import('./types').ParsedSource>}
 */
async function readSource(source) {
  const map = new CodeMap(source);

  const ast = YAML.parseDocument(source, { customTags: [SassValue.tag] });
  if (ast.errors && ast.errors.length) {
    const max = Math.min(ast.errors.length, 10);
    const errors = ast.errors.slice(0, max).map((yamlError) => {
      const { start, end } = yamlError.source.range;
      return map.errorForRange("YAML error", [start, end], yamlError);
    });

    throw fromArray(errors);
  }

  return {
    source,
    ast,
    map,
  };
}

module.exports = readSource;
