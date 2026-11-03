import { describe, expect, it } from 'vitest';
import keysort from './keysort.ts';
import { render } from './testUtils.ts';

const r = (template: string, context = {}) =>
  render(keysort, template, context);
const loop = `{% for k, v in o|keysort %}[{{ k }}|{{ v }}]{% endfor %}`;

describe('keysort', () => {
  it('sorts numeric keys numerically', () => {
    expect(r(loop, { o: { 100: 'h', 20: 't', 3: 'x' } })).toBe(
      '[3|x][20|t][100|h]'
    );
  });

  // Regression: Number.isNaN() was called on string keys, so it never
  // detected non-numeric keys and the comparator returned 0 for them.
  it('sorts string keys alphabetically', () => {
    expect(r(loop, { o: { zeta: 1, alpha: 2, mid: 3 } })).toBe(
      '[alpha|2][mid|3][zeta|1]'
    );
  });

  it('sorts numeric keys before string keys', () => {
    expect(
      r(loop, { o: { b: 'B', 10: 'ten', a: 'A', 2: 'two', 1: 'one' } })
    ).toBe('[1|one][2|two][10|ten][a|A][b|B]');
  });

  it('sorts decimal and negative numeric keys numerically', () => {
    expect(r(loop, { o: { '1.5': 'a', '-2': 'b', '1.25': 'c', 0: 'd' } })).toBe(
      '[-2|b][0|d][1.25|c][1.5|a]'
    );
  });

  // Regression: every key used to get a trailing space ("2 ").
  it('does not add whitespace to key names', () => {
    const out = r(
      `{% for k, v in o|keysort %}[{{ k }}]{% endfor %}{{ o|keysort|json_encode }}`,
      { o: { 10: 'a', 2: 'b', x: 'c' } }
    );
    expect(out).toBe('[2][10][x]{"2":"b","10":"a","x":"c"}');
  });

  it('keeps the sorted order for key lookups', () => {
    expect(
      r(`{% set s = o|keysort %}{{ s.b }}{{ s[2] }}`, {
        o: { b: 'B', 2: 'two' },
      })
    ).toBe('Btwo');
  });

  it('returns non-objects unchanged', () => {
    expect(r(`{{ o|keysort }}`, { o: 'str' })).toBe('str');
    expect(r(`[{{ o|keysort }}]`, { o: null })).toBe('[]');
    expect(r(`{{ o|keysort|join(',') }}`, { o: ['b', 'a'] })).toBe('b,a');
  });

  it('does not mutate the input', () => {
    const o = { b: 1, a: 2 };
    r(loop, { o });
    expect(Object.keys(o)).toEqual(['b', 'a']);
  });

  it('sorts an empty object', () => {
    expect(r(loop, { o: {} })).toBe('');
  });

  it('works with the spacing template pattern', () => {
    expect(
      r(
        `{% for name, unit in o|keysort %}{{ name|trim }}={{ unit }};{% endfor %}`,
        {
          o: { 16: '1rem', 4: '4px', 8: '8px' },
        }
      )
    ).toBe('4=4px;8=8px;16=1rem;');
  });
});
