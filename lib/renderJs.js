// @ts-check

function createJsonMap(data) {
  return JSON.stringify(data, null, 2);
}

/**
 *
 * @param {import('./types').GessoData} data
 */
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
