import { describe, expect, it } from 'vitest';
import subheadingLevel from './subheadingLevel.ts';
import { render } from './testUtils.ts';

const r = (v: unknown) =>
  render(subheadingLevel, `[{{ v|subheading_level }}]`, { v });

describe('subheading_level', () => {
  it.each([
    ['h1', 'h2'],
    ['H2', 'h3'],
    ['h5', 'h6'],
    ['h6', 'h6'],
    ['h7', 'h6'],
  ])('%s becomes %s', (input, expected) => {
    expect(r(input)).toBe(`[${expected}]`);
  });

  it.each([
    ['div', 'div'],
    ['P', 'p'],
    ['h', 'h'],
  ])('lowercases non-heading value %s', (input, expected) => {
    expect(r(input)).toBe(`[${expected}]`);
  });

  // Regression: a missing or non-string value used to throw a TypeError
  // (value.toLowerCase is not a function) and break the whole render.
  it('does not throw for undefined or non-string values', () => {
    expect(r(undefined)).toBe('[]');
    expect(r(3)).toBe('[3]');
  });
});
