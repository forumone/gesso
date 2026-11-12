import { describe, expect, it } from 'vitest';

import { createJsonMap, renderJs } from './renderJs.ts';
import { SassValue } from './SassValue.ts';

describe('createJsonMap', () => {
  it('stringifies with two-space indentation', () => {
    expect(createJsonMap({ a: 1 })).toBe('{\n  "a": 1\n}');
  });

  it('serializes SassValues as their fallback', () => {
    const value = new SassValue(undefined, 'foo()', '#f00');

    expect(createJsonMap({ a: value })).toBe('{\n  "a": "#f00"\n}');
  });
});

describe('renderJs', () => {
  it('exports each top-level key as an upper-snake-case constant', () => {
    expect(
      renderJs({ gesso: { 'z-index': { nav: 1 }, spacing: { 1: '8px' } } })
    ).toBe(
      'export const Z_INDEX = {\n  "nav": 1\n};\n\n' +
        'export const SPACING = {\n  "1": "8px"\n};\n\n'
    );
  });

  it('returns an empty string when there is no gesso data', () => {
    expect(renderJs({})).toBe('');
  });
});
