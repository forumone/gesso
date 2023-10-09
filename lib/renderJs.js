// @ts-check

/**
 * Transform the data into a JSON string.
 * @param {import('./types').GessoData} data
 * @returns {string}
 */
function createJsonMap(data) {
  return JSON.stringify(data, null, 2);
}

/**
 * Prepare the data to be output in JavaScript.
 * @param {object} data
 * @param {import('./types').GessoData} [data.gesso]
 * @returns {string}
 */
function renderJs(data) {
  let output = '';
  if (data.gesso) {
    Object.entries(data.gesso).forEach(([key, value]) => {
      const name = key.toUpperCase().replace(/-/g, '_');
      const json = createJsonMap(value);
      output += `export const ${name} = ${json};\n\n`;
    });
  }
  return output;
}

module.exports = renderJs;
