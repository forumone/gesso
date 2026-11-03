import { NaniError } from 'nani';

/**
 * Checks whether a value is a CSS Variable
 */
export function isCssVar(value: string): boolean {
  return value.includes('var(');
}

/**
 * Checks whether value is a CSS color function.
 *
 * CSS gives us a lot of ways to write colors, all of which, for sass purposes,
 * should be treated as numbers and not wrapped in quotes in the output.
 */
export function isColorSyntax(value: string): boolean {
  const splitValue = value.split('(');
  if (splitValue.length <= 1) {
    return false;
  }
  const functionName = splitValue[0] ?? '';
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
 */
export function isNumberLike(value: string): boolean {
  return /^-?\d*\.?\d+/.test(value) || /^#([0-9a-fA-F]{3}){1,2}$/.test(value);
}

/**
 * Prepares a JS value for output as a Sass value.
 *
 * The parameter is typed `unknown` because values come from parsed YAML; anything
 * other than a string or number is rejected at runtime.
 */
export function cleanValue(value: unknown): number | string {
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
