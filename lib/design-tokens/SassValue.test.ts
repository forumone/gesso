import { parseDocument } from 'yaml';
import { describe, expect, it } from 'vitest';

import { SassValue, tag } from './SassValue.ts';

function parse(source: string) {
  return parseDocument(source, { customTags: [tag] });
}

describe('SassValue', () => {
  it('stores the sass and fallback values', () => {
    const value = new SassValue(undefined, 'foo()', '#f00');

    expect(value.sass).toBe('foo()');
    expect(value.fallback).toBe('#f00');
    expect(value.tag).toBe('!sass');
  });

  it('serializes to its fallback', () => {
    expect(new SassValue(undefined, 'foo()', '#f00').toJSON()).toBe('#f00');
    expect(new SassValue(undefined, 'foo()').toJSON()).toBeUndefined();
  });
});

describe('tag', () => {
  it('identifies only SassValue instances', () => {
    expect(tag.identify?.(new SassValue())).toBe(true);
    expect(tag.identify?.({ sass: 'x' })).toBe(false);
    expect(tag.identify?.('x')).toBe(false);
  });

  it('parses the object notation', () => {
    const doc = parse(
      "foo: !sass\n  sass: some-function(foo,bar)\n  fallback: '#f00'\n"
    );
    const value = doc.get('foo') as unknown;

    expect(doc.errors).toEqual([]);
    expect(value).toBeInstanceOf(SassValue);
    expect((value as SassValue).sass).toBe('some-function(foo,bar)');
    expect((value as SassValue).fallback).toBe('#f00');
  });

  it('parses the single-value shorthand as a tagged scalar', () => {
    // The yaml package can't apply a collection tag to a scalar, so the
    // shorthand arrives as a plain scalar carrying the tag. `transform` turns
    // it into a SassValue (see transform.test.ts).
    const doc = parse('foo: !sass some-function(foo,bar)\n');
    const node = doc.get('foo', true) as { tag?: string; value?: unknown };

    expect(doc.errors).toEqual([]);
    expect(node.tag).toBe('!sass');
    expect(node.value).toBe('some-function(foo,bar)');
  });

  it('resolves a non-map value to a SassValue holding it as sass', () => {
    const resolve = tag.resolve as unknown as (value: unknown) => SassValue;
    const value = resolve('some-function()');

    expect(value).toBeInstanceOf(SassValue);
    expect(value.sass).toBe('some-function()');
    expect(value.fallback).toBeUndefined();
  });
});
