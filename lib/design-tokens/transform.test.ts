import { parseDocument, type Scalar } from 'yaml';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { CodeMap } from './CodeMap.ts';
import { readSource } from './readSource.ts';
import { SassValue, tag } from './SassValue.ts';
import {
  asSassValue,
  colorTransformer,
  fontFamilyTransformer,
  getScalarVisitor,
  identityTransformer,
  isScalar,
  paletteTransformer,
  transform,
} from './transform.ts';
import type { GessoObject } from './types.ts';

async function run(source: string) {
  return transform(await readSource(source));
}

const tokens = `gesso:
  palette:
    brand:
      blue:
        base: '#0071BC'
  colors:
    text:
      primary: brand.blue.base
  typography:
    font-family:
      primary:
        stack: 'Arial, sans-serif'
    font-size:
      1: 12px
    line-height:
      base: 1.45
`;

afterEach(() => {
  vi.restoreAllMocks();
});

/** Parses the source and returns the scalar at `path` plus its document. */
function scalarFixture(source: string, path: (string | number)[]) {
  const doc = parseDocument(source, { customTags: [tag] });
  const node = doc.getIn(path, true) as Scalar<never>;
  return { node, doc };
}

describe('isScalar', () => {
  it('is true for scalars and tagged !sass nodes, false for collections', () => {
    const doc = parseDocument(
      'a: 1\nb: !sass\n  sass: x\nc: [1]\nd: {e: 1}\n',
      {
        customTags: [tag],
      }
    );

    expect(isScalar(doc.get('a', true) as never)).toBe(true);
    expect(isScalar(doc.get('b', true) as never)).toBe(true);
    expect(isScalar(doc.get('c', true) as never)).toBe(false);
    expect(isScalar(doc.get('d', true) as never)).toBe(false);
  });
});

describe('asSassValue', () => {
  it('returns SassValue nodes as-is', () => {
    const value = new SassValue(undefined, 'x');

    expect(asSassValue(value as never)).toBe(value);
  });

  it('converts a !sass tagged scalar', () => {
    const doc = parseDocument('a: !sass foo($b, c)\n');
    const result = asSassValue(doc.get('a', true));

    expect(result).toBeInstanceOf(SassValue);
    expect(result?.sass).toBe('foo($b, c)');
  });

  it('returns undefined for ordinary scalars', () => {
    const doc = parseDocument('a: 1\n');

    expect(asSassValue(doc.get('a', true) as never)).toBeUndefined();
  });
});

describe('transformers', () => {
  const source = `gesso:
  palette:
    red: '#f00'
  colors:
    a: red
  typography:
    font-family:
      primary:
        stack: Arial
`;

  it('identityTransformer returns the node value', () => {
    const { node, doc } = scalarFixture(source, ['gesso', 'palette', 'red']);

    expect(identityTransformer(node, doc as never, new CodeMap(source))).toBe(
      '#f00'
    );
  });

  it('paletteTransformer resolves palette keys', () => {
    const { node, doc } = scalarFixture(source, ['gesso', 'colors', 'a']);

    expect(paletteTransformer(node, doc as never, new CodeMap(source))).toBe(
      '#f00'
    );
  });

  it('paletteTransformer reports unknown keys with a line number', () => {
    const bad = source.replace('a: red', 'a: nope');
    const { node, doc } = scalarFixture(bad, ['gesso', 'colors', 'a']);

    expect(() =>
      paletteTransformer(node, doc as never, new CodeMap(bad))
    ).toThrow("Could not resolve 'nope' in gesso.palette on line 5");
  });

  it('paletteTransformer reports unknown keys on nodes without a range', () => {
    const bad = source.replace('a: red', 'a: nope');
    const { node, doc } = scalarFixture(bad, ['gesso', 'colors', 'a']);
    node.range = null;

    expect(() =>
      paletteTransformer(node, doc as never, new CodeMap(bad))
    ).toThrow("Could not resolve 'nope' in gesso.palette");
  });

  it('paletteTransformer does not look up quoted strings', () => {
    const quoted = source.replace('a: red', "a: 'not a key'");
    const { node, doc } = scalarFixture(quoted, ['gesso', 'colors', 'a']);

    expect(paletteTransformer(node, doc as never, new CodeMap(quoted))).toBe(
      'not a key'
    );
  });

  it('colorTransformer resolves gesso.colors references through the palette', () => {
    const nested = `gesso:
  palette:
    red: '#f00'
  colors:
    a: red
  other:
    b: a
`;
    const { node, doc } = scalarFixture(nested, ['gesso', 'other', 'b']);

    expect(colorTransformer(node, doc as never, new CodeMap(nested))).toBe(
      '#f00'
    );
  });

  it('colorTransformer falls back to the palette', () => {
    const src = `gesso:
  palette:
    red: '#f00'
  other:
    b: red
`;
    const { node, doc } = scalarFixture(src, ['gesso', 'other', 'b']);

    expect(colorTransformer(node, doc as never, new CodeMap(src))).toBe('#f00');
  });

  it('colorTransformer leaves quoted strings alone', () => {
    const src = "gesso:\n  other:\n    b: 'x y'\n";
    const { node, doc } = scalarFixture(src, ['gesso', 'other', 'b']);

    expect(colorTransformer(node, doc as never, new CodeMap(src))).toBe('x y');
  });

  it('fontFamilyTransformer resolves font-family keys', () => {
    const src = `${source}  other:\n    f: primary.stack\n`;
    const { node, doc } = scalarFixture(src, ['gesso', 'other', 'f']);

    expect(fontFamilyTransformer(node, doc as never, new CodeMap(src))).toBe(
      'Arial'
    );
  });

  it('fontFamilyTransformer reports unknown keys with the right path', () => {
    const src = `${source}  other:\n    f: missing\n`;
    const { node, doc } = scalarFixture(src, ['gesso', 'other', 'f']);

    expect(() =>
      fontFamilyTransformer(node, doc as never, new CodeMap(src))
    ).toThrow("Could not resolve 'missing' in gesso.typography.font-family");
  });

  // Regression: the no-range message used to say "in gesso.colors".
  it('fontFamilyTransformer uses the font-family path without a range', () => {
    const src = `${source}  other:\n    f: missing\n`;
    const { node, doc } = scalarFixture(src, ['gesso', 'other', 'f']);
    node.range = null;

    expect(() =>
      fontFamilyTransformer(node, doc as never, new CodeMap(src))
    ).toThrow(
      new RegExp(
        "^Could not resolve 'missing' in gesso\\.typography\\.font-family$"
      )
    );
  });

  it('SassValue nodes bypass every lookup', () => {
    const value = new SassValue(undefined, 'x');
    const doc = parseDocument(source);
    const map = new CodeMap(source);

    for (const visitor of [
      paletteTransformer,
      colorTransformer,
      fontFamilyTransformer,
    ]) {
      expect(visitor(value as never, doc as never, map)).toBe(value);
    }
  });
});

describe('getScalarVisitor', () => {
  it('uses the palette transformer under gesso.colors', () => {
    expect(getScalarVisitor(['gesso', 'colors', 'text', 'a'])).toBe(
      paletteTransformer
    );
  });

  it('uses the identity transformer for passthrough display properties', () => {
    for (const key of [
      'font-style',
      'text-transform',
      'responsive-font-size',
    ]) {
      expect(
        getScalarVisitor(['gesso', 'typography', 'display', 'h1', key])
      ).toBe(identityTransformer);
    }
  });

  it('uses the specialised transformers for color and font-family', () => {
    expect(
      getScalarVisitor(['gesso', 'typography', 'display', 'h1', 'color'])
    ).toBe(colorTransformer);
    expect(
      getScalarVisitor(['gesso', 'typography', 'display', 'h1', 'font-family'])
    ).toBe(fontFamilyTransformer);
  });

  it('uses an identity-like visitor elsewhere', () => {
    const src = 'gesso:\n  a: 1\n';
    const { node, doc } = scalarFixture(src, ['gesso', 'a']);

    expect(
      getScalarVisitor(['gesso', 'a'])(node, doc as never, new CodeMap(src))
    ).toBe(1);
  });
});

describe('transform', () => {
  it('resolves references and keeps the parsed source', async () => {
    const result = await run(tokens);

    expect(result.data.gesso['colors']).toEqual({
      text: { primary: '#0071BC' },
    });
    expect(result.source).toBe(tokens);
    expect(result.map).toBeInstanceOf(CodeMap);
  });

  it('resolves display properties through gesso.typography', async () => {
    const result = await run(
      `${tokens}    display:
      h1:
        color: text.primary
        font-family: primary.stack
        font-size: 1
        line-height: base
        text-transform: uppercase
`
    );
    const typography = result.data.gesso['typography'] as GessoObject;

    expect(typography['display']).toEqual({
      h1: {
        color: '#0071BC',
        'font-family': 'Arial, sans-serif',
        'font-size': '12px',
        'line-height': 1.45,
        'text-transform': 'uppercase',
      },
    });
  });

  it('keeps !sass values as SassValue instances', async () => {
    const result = await run(
      'gesso:\n  a: !sass foo($b, c)\n  b: !sass\n    sass: bar()\n    fallback: red\n'
    );
    const { a, b } = result.data.gesso as Record<string, SassValue>;

    expect(a).toBeInstanceOf(SassValue);
    expect(a.sass).toBe('foo($b, c)');
    expect(b).toBeInstanceOf(SassValue);
    expect(b.sass).toBe('bar()');
    expect(b.fallback).toBe('red');
  });

  it('transforms sequences into arrays', async () => {
    const result = await run('gesso:\n  list: [1, two]\n');

    expect(result.data.gesso['list']).toEqual([1, 'two']);
  });

  it('rejects a root document that is not a map', async () => {
    await expect(run('- a\n- b\n')).rejects.toThrow(
      'Root document not a YAML map.'
    );
  });

  it('rejects a document without a gesso key', async () => {
    await expect(run('other: 1\n')).rejects.toThrow(
      'Root document does not contain a gesso object.'
    );
  });

  // Regression: a scalar `gesso` used to pass this check and then crash in
  // the renderers with an unhelpful error.
  it('rejects a gesso key that is not an object', async () => {
    await expect(run('gesso: 5\n')).rejects.toThrow(
      'Root document does not contain a gesso object.'
    );
    await expect(run('gesso: [1]\n')).rejects.toThrow(
      'Root document does not contain a gesso object.'
    );
  });

  it('logs every unique error and throws a summary', async () => {
    const consoleError = vi
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    await expect(
      run(
        `gesso:
  palette:
    red: '#f00'
  colors:
    a: nope
    b: missing
    c: nope
`
      )
    ).rejects.toThrow('Failed to transform design tokens');

    const logged = consoleError.mock.calls.map(call => String(call[0]));
    expect(
      logged.some(m => m.includes("'nope' in gesso.palette on line 5"))
    ).toBe(true);
    expect(
      logged.some(m => m.includes("'missing' in gesso.palette on line 6"))
    ).toBe(true);
    expect(
      logged.some(m => m.includes("'nope' in gesso.palette on line 7"))
    ).toBe(true);
  });

  it('logs a single error', async () => {
    const consoleError = vi
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    await expect(
      run("gesso:\n  palette:\n    red: '#f00'\n  colors:\n    a: nope\n")
    ).rejects.toThrow('Failed to transform design tokens');

    expect(consoleError).toHaveBeenCalledTimes(1);
  });

  // Regression: the message was missing its closing quote.
  it('reports unknown display properties with balanced quotes', async () => {
    const consoleError = vi
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    await expect(
      run(`${tokens}    display:\n      h1:\n        bogus: x\n`)
    ).rejects.toThrow('Failed to transform design tokens');

    expect(String(consoleError.mock.calls[0]?.[0])).toContain(
      'Unknown property "bogus" on line'
    );
  });

  it('reports unresolvable display values', async () => {
    const consoleError = vi
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    await expect(
      run(`${tokens}    display:\n      h1:\n        font-size: 99\n`)
    ).rejects.toThrow('Failed to transform design tokens');

    expect(String(consoleError.mock.calls[0]?.[0])).toContain(
      "Could not resolve 'font-size.99' on line"
    );
  });

  it('reports complex keys', async () => {
    const consoleError = vi
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    await expect(run('gesso:\n  ? [a, b]\n  : c\n')).rejects.toThrow(
      'Failed to transform design tokens'
    );

    expect(String(consoleError.mock.calls[0]?.[0])).toContain(
      "Can't handle complex key"
    );
  });
});
