// @ts-check

'use strict';

const SassValue = require('./SassValue');

function createJsonMap(data) {
  return JSON.stringify(
    data,
    (key, value) => (value instanceof SassValue ? value.fallback : value),
    2
  );
}

function renderJs(data) {
  let output = '';
  if (data.gesso) {
    for (const [key, value] of Object.entries(data.gesso)) {
      const name = key.toUpperCase().replace(/-/g, '_');
      const json = createJsonMap(value);
      output += `export const ${name} = ${json};\n\n`;
    }
  }
  return output;
}

module.exports = renderJs;
