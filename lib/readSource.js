// @ts-check

const { fromArray } = require('nani');
const YAML = require('yaml');

const CodeMap = require('./CodeMap');
const sassTag = require('./SassValue').tag;

/**
 * @param {string} source
 * @returns {Promise<import('./types').ParsedSource<import('yaml').ParsedNode, true>>}
 */
async function readSource(source) {
  const map = new CodeMap(source);

  const ast = YAML.parseDocument(source, { customTags: [sassTag] });
  if (ast.errors && ast.errors.length) {
    const max = Math.min(ast.errors.length, 10);
    const errors = ast.errors.slice(0, max).map(yamlError => {
      const [start, end] = yamlError.pos;
      return map.errorForRange('YAML error', [start, end, end], yamlError);
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
