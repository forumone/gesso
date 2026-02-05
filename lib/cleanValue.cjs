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
 * Checks whether value is something we want to treat like a number.
 *
 * This includes numbers with units and hexadecimal values. In the case of numbers
 * with units, we're making the assuming that anything that starts with a number
 * (or a negative sign first) is a number, not a string that should be quoted.
 * @param {string} value
 * @returns {boolean}
 */
function isNumberLike(value) {
  return /^-?\d*\.?\d+/.test(value) || /^#([0-9a-fA-F]{3}){1,2}$/.test(value);
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

module.exports = { cleanValue, isCssVar, isColorSyntax, isNumberLike };
