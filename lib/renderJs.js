// @ts-check

'use strict';

function createJsonMap(data) {
  return JSON.stringify(data, null, 2);
}

function renderJs(data) {
  let output = '';
  if (data.gesso) {
    const gessoCategories = Object.keys(data.gesso);
    gessoCategories.forEach(key => {
      const name = key.toUpperCase().replace('-', '_');
      const json = createJsonMap(data.gesso[key]);
      output += `export const ${name} = ${json}\n`;
    });
  }
  return output;
}

module.exports = renderJs;
