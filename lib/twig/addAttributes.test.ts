import { describe, expect, it } from 'vitest';
import addAttributes from './addAttributes.ts';
import { render } from './testUtils.ts';

// Twig.js object literals carry an internal `_keys` entry that renders as an
// empty attribute, leaving a trailing space. Tests that only care about the
// attributes themselves trim it.
const r = (template: string, context = {}) =>
  render(addAttributes, template, context);
const rt = (template: string, context = {}) => r(template, context).trim();

describe('add_attributes', () => {
  it('renders strings, arrays and bare boolean attributes, skipping empty values', () => {
    const out = r(
      `<div {{ add_attributes({ class: ['a','b'], id: 'x', hidden: true, nope: false, nul: null }) }}>`
    );
    expect(out).toContain('class="a b"');
    expect(out).toContain('id="x"');
    expect(out).toMatch(/ hidden /);
    expect(out).not.toContain('nope');
    expect(out).not.toContain('nul');
  });

  it('merges with the "attributes" variable from the context by default', () => {
    expect(
      r(`<div {{ add_attributes({ class: 'c', 'data-x': 'y' }) }}>`, {
        attributes: { class: 'base', role: 'main' },
      })
    ).toBe('<div class="base c" role="main" data-x="y" >');
  });

  it('merges with a dot-separated context path', () => {
    expect(
      r(`<div {{ add_attributes({ class: 'c' }, 'foo.attrs') }}>`, {
        foo: { attrs: { class: ['q'] } },
      })
    ).toBe('<div class="q c" >');
  });

  it('merges with an explicit object, overwriting non-array values', () => {
    expect(
      r(
        `<div {{ add_attributes({ class: 'c' }, { class: 'z', title: 't' }) }}>`
      )
    ).toBe('<div title="t"  class="z c">');
  });

  it('passes through strings containing "=" as-is', () => {
    expect(r(`<div {{ add_attributes({ x: 'a="b"' }) }}>`)).toBe(
      '<div x="a="b"" >'
    );
  });

  it('skips merging when the original attributes name is empty', () => {
    expect(
      r(`<div {{ add_attributes({ class: 'c' }, '') }}>`, {
        attributes: { id: 'ignored' },
      })
    ).toBe('<div class="c" >');
  });

  it('ignores a missing context path', () => {
    expect(rt(`{{ add_attributes({ id: 'a' }, 'nope.deep') }}`)).toBe('id="a"');
  });

  // Regression: a context path ending at a string used to be spread into
  // character-indexed attributes (0="f" 1="o" 2="o").
  it('does not spread a non-object context value into attributes', () => {
    expect(
      rt(`{{ add_attributes({ id: 'a' }, 'attributes') }}`, {
        attributes: 'foo',
      })
    ).toBe('id="a"');
  });

  it('renders numbers', () => {
    expect(rt(`{{ add_attributes({ tabindex: 0 }) }}`)).toBe('tabindex="0"');
  });

  it('does not render the internal _keys property', () => {
    expect(r(`{{ add_attributes({ id: 'a', b: 'c' }) }}`)).not.toContain(
      '_keys'
    );
  });
});
