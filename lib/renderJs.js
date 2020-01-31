// @ts-check

'use strict';

const SassValue = require('./SassValue');

function createJsonMap(data) {
  return JSON.stringify(
    data,
    (key, value) =>
      value instanceof SassValue
        ? value.fallback
          ? value.fallback
          : undefined
        : value,
    2
  );
}

function renderJs(data) {
  let output = '';
  if (data.gesso) {
    const gessoCategories = Object.keys(data.gesso);
    gessoCategories.forEach(key => {
      const name = key.toUpperCase().replace('-', '_');
      const json = createJsonMap(data.gesso[key]);
      output += `export const ${name} = ${json};\n\n`;
    });
  }
  return output;
}

module.exports = renderJs;
