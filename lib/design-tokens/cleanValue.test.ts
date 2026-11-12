import { describe, expect, it } from 'vitest';

import {
  cleanValue,
  isColorSyntax,
  isCssVar,
  isNumberLike,
} from './cleanValue.ts';

describe('isCssVar', () => {
  it.each([
    ['var(--foo)', true],
    ['1px solid var(--foo)', true],
    ['--foo', false],
    ['red', false],
  ])('%s -> %s', (value, expected) => {
    expect(isCssVar(value)).toBe(expected);
  });
});

describe('isColorSyntax', () => {
  it.each([
    ['rgb(0 0 0)', true],
    ['RGBA(0, 0, 0, 0.5)', true],
    ['oklch(70% 0.1 200)', true],
    ['color-mix(in srgb, red, blue)', true],
    ['light-dark(#fff, #000)', true],
    ['calc(1px + 2px)', false],
    ['red', false],
    ['#fff', false],
  ])('%s -> %s', (value, expected) => {
    expect(isColorSyntax(value)).toBe(expected);
  });
});

describe('isNumberLike', () => {
  it.each([
    ['12', true],
    ['-1.5em', true],
    ['.5', true],
    ['#fff', true],
    ['#0071BC', true],
    ['#ggg', false],
    ['red', false],
    ['', false],
  ])('%s -> %s', (value, expected) => {
    expect(isNumberLike(value)).toBe(expected);
  });
});

describe('cleanValue', () => {
  it('returns numbers unchanged', () => {
    expect(cleanValue(0)).toBe(0);
    expect(cleanValue(1.45)).toBe(1.45);
  });

  it('returns simple strings unchanged', () => {
    expect(cleanValue('16px')).toBe('16px');
    expect(cleanValue('#0071BC')).toBe('#0071BC');
  });

  it('quotes strings containing spaces', () => {
    expect(cleanValue('0 1px 3px')).toBe("'0 1px 3px'");
  });

  it('quotes strings containing ..', () => {
    expect(cleanValue('a..b')).toBe("'a..b'");
  });

  it('uses double quotes when the string contains a single quote', () => {
    expect(cleanValue("it's here")).toBe('"it\'s here"');
  });

  it('does not quote CSS variables or color functions', () => {
    expect(cleanValue('var(--foo, 1px solid red)')).toBe(
      'var(--foo, 1px solid red)'
    );
    expect(cleanValue('rgb(0 0 0 / 12%)')).toBe('rgb(0 0 0 / 12%)');
  });

  it('throws for values that are not strings or numbers', () => {
    expect(() => cleanValue(true)).toThrow(/boolean, not a string or number/);
    expect(() => cleanValue({})).toThrow(/object, not a string or number/);
  });
});
