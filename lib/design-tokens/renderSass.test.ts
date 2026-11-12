import { describe, expect, it } from 'vitest';

import { createSassMap, renderSass } from './renderSass.ts';
import { SassValue } from './SassValue.ts';

describe('createSassMap', () => {
  it('renders nested maps with indentation', () => {
    expect(createSassMap({ a: { b: 1, c: 'x' }, d: '16px' })).toBe(
      '(\n  a: (\n    b: 1,\n    c: x,\n  ),\n  d: 16px,\n)'
    );
  });

  it('quotes values that need it', () => {
    expect(createSassMap({ a: '0 1px 3px' })).toBe("(\n  a: '0 1px 3px',\n)");
  });

  it('renders null and undefined as null', () => {
    expect(createSassMap({ a: null, b: undefined as unknown as null })).toBe(
      '(\n  a: null,\n  b: null,\n)'
    );
  });

  it('renders SassValues raw, ignoring the fallback', () => {
    const value = new SassValue(undefined, 'map.get($a, b)', '#f00');

    expect(createSassMap({ a: value })).toBe('(\n  a: map.get($a, b),\n)');
  });

  // Regression: booleans used to fall through to the map branch and rendered
  // as an empty map.
  it('renders booleans as Sass booleans', () => {
    expect(createSassMap({ on: true, off: false })).toBe(
      '(\n  on: true,\n  off: false,\n)'
    );
  });

  it('renders an empty map', () => {
    expect(createSassMap({})).toBe('(\n)');
  });
});

describe('renderSass', () => {
  it('renders the gesso data as the $gesso variable', () => {
    expect(renderSass({ gesso: { a: 1 } })).toBe('$gesso: (\n  a: 1,\n);');
  });

  it('passes strings through unchanged', () => {
    expect(renderSass('$already: rendered;')).toBe('$already: rendered;');
  });

  it('rejects arrays', () => {
    expect(() => renderSass([] as unknown as string)).toThrow(
      /Expecting non-array object for rendering sass; got object/
    );
  });

  // Regression: null used to escape as a bare TypeError.
  it('rejects null with a descriptive error', () => {
    expect(() => renderSass(null as unknown as string)).toThrow(
      /Expecting non-array object for rendering sass; got null/
    );
  });

  it('rejects other types', () => {
    expect(() => renderSass(5 as unknown as string)).toThrow(/got number/);
  });

  it('wraps rendering failures', () => {
    expect(() =>
      renderSass({} as unknown as { gesso: Record<string, never> })
    ).toThrow(/Unable to compile tokens to Sass/);
  });
});
