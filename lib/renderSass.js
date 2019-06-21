// @ts-check

'use strict';

const { NaniError } = require('nani');

/**
 * Prepares a JS value for output as a Sass value.
 *
 * @param {unknown} value
 */
function cleanValue(value) {
  if (typeof value === 'number') {
    return value;
  }

  if (typeof value !== 'string') {
    throw new NaniError({
      shortMessage: `Value passed to cleanValue() is ${typeof value}, not a string or number`,
    });
  }

  if (!value.includes(' ')) {
    return value;
  }

  return value.includes("'") ? '"' + value + '"' : "'" + value + "'";
}

function createSassMap(data, indent = 2) {
  let output = '';
  const prefix = ' '.repeat(indent);

  output += '(\n';
  for (const [key, value] of Object.entries(data)) {
    output += `${prefix}${key}: `;
    switch (typeof value) {
      case 'number':
      case 'string':
        output += cleanValue(value);
        break;

      default:
        if (value === null || value === undefined) {
          output += 'null';
        } else {
          output += createSassMap(value, indent + 2);
        }

        break;
    }

    output += ',\n';
  }
  output += ' '.repeat(indent - 2) + ')';

  return output;
}

/**
 *
 * @param {import('./types').GessoData} data
 */
function renderSass(data) {
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
