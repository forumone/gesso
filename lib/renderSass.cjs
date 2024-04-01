// @ts-check

const { NaniError } = require('nani');

const { SassValue } = require('./SassValue.cjs');
const cleanValue = require('./cleanValue.cjs');

/**
 * Transform the data into a Sass map.
 * @param {import('./types').GessoData} data
 * @param {number} [indent]
 * @returns {string}
 */
function createSassMap(data, indent = 2) {
  let output = '';
  const prefix = ' '.repeat(indent);

  output += '(\n';
  Object.entries(data).forEach(([key, value]) => {
    output += `${prefix}${key}: `;
    switch (typeof value) {
      case 'number':
      case 'string':
        output += cleanValue(value);
        break;

      default:
        if (value === null || value === undefined) {
          output += 'null';
        } else if (value instanceof SassValue) {
          // Don't output the 'fallback' field for raw Sass.
          output += value.sass;
        } else {
          output += createSassMap(value, indent + 2);
        }

        break;
    }

    output += ',\n';
  });
  output += `${' '.repeat(indent - 2)})`;

  return output;
}

/**
 * Prepare the data to be output in Sass.
 * @param {object | string} data
 * @param {import('./types').GessoData} data.gesso
 * @returns {string}
 */
function renderSass(data) {
  if (typeof data === 'string') {
    try {
      return data;
    } catch (error) {
      throw new NaniError({
        shortMessage: 'Unable to compile tokens to Sass',
        cause: error,
      });
    }
  }
  if (typeof data !== 'object' || Array.isArray(data)) {
    throw new NaniError({
      shortMessage: `Expecting non-array object for rendering sass; got ${typeof data}`,
    });
  }

  try {
    return `$gesso: ${createSassMap(data.gesso)};`;
  } catch (error) {
    throw new NaniError({
      shortMessage: 'Unable to compile tokens to Sass',
      cause: error,
    });
  }
}

module.exports = renderSass;
