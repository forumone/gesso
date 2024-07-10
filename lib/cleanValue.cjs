// @ts-check

const { NaniError } = require('nani');

/**
 * Checks whether a value is a CSS Variable
 * @param {string} value
 * @returns {boolean}
 */
function isCssVar(value) {
  return value.includes('var(');
}

/**
 * Checks whether value is a CSS color function.
 *
 * CSS gives us a lot of ways to write colors, all of which, for sass purposes,
 * should be treated as numbers and not wrapped in quotes in the output.
 * @param {string} value
 * @returns {boolean}
 */
function isColorSyntax(value) {
  const splitValue = value.split('(');
  if (splitValue.length <= 1) {
    return false;
  }
  const functionName = splitValue[0];
  return [
    'rgb',
    'rgba',
    'hsl',
    'hsla',
    'lab',
    'lch',
    'oklab',
    'oklch',
    'color',
    'color-contrast',
    'color-mix',
    'device-cmyk',
    'light-dark',
  ].includes(functionName.toLowerCase());
}

/**
 * Prepares a JS value for output as a Sass value.
 *
 * @param {number | string} value
 * @returns {number | string}
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

  if (
    (value.includes(' ') || value.includes('..')) &&
    !(isCssVar(value) || isColorSyntax(value))
  ) {
    return value.includes("'") ? `"${value}"` : `'${value}'`;
  }

  return value;
}

module.exports = cleanValue;
