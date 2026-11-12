import type { MultiError } from 'nani';
import { describe, expect, it } from 'vitest';

import { CodeMap } from './CodeMap.ts';
import { readSource } from './readSource.ts';
import { SassValue } from './SassValue.ts';

describe('readSource', () => {
  it('resolves the source, parsed document and code map', async () => {
    const source = 'gesso:\n  a: 1\n';
    const parsed = await readSource(source);

    expect(parsed.source).toBe(source);
    expect(parsed.map).toBeInstanceOf(CodeMap);
    expect(parsed.ast.toJS()).toEqual({ gesso: { a: 1 } });
  });

  it('understands the !sass tag', async () => {
    const parsed = await readSource(
      'gesso:\n  a: !sass\n    sass: foo()\n    fallback: red\n'
    );

    expect(parsed.ast.getIn(['gesso', 'a'])).toBeInstanceOf(SassValue);
  });

  it('rejects with the line number of a YAML syntax error', async () => {
    await expect(readSource('gesso:\n  a: [1, 2\n  b: 3\n')).rejects.toThrow(
      /YAML error on line \d/
    );
  });

  it('reports at most ten errors', async () => {
    // Every repeated key after the first is a separate error.
    const source = Array.from({ length: 15 }, () => 'a: 1').join('\n');

    const error = await readSource(source).catch((e: unknown) => e);

    expect((error as MultiError).errors).toHaveLength(10);
  });
});
