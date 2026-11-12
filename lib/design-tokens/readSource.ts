import { fromArray } from 'nani';
import { parseDocument, type ParsedNode } from 'yaml';

import { CodeMap } from './CodeMap.ts';
import { tag as sassTag } from './SassValue.ts';
import type { ParsedSource } from './types.ts';

/**
 * Parses the design tokens YAML, reporting up to ten syntax errors (with line
 * numbers) as a single thrown error.
 */
// Declared async so that errors are reported as rejections rather than
// synchronous throws, matching what callers (and the loader) expect.
// eslint-disable-next-line @typescript-eslint/require-await
export async function readSource(
  source: string
): Promise<ParsedSource<ParsedNode, true>> {
  const map = new CodeMap(source);

  const ast = parseDocument(source, { customTags: [sassTag] });
  if (ast.errors.length > 0) {
    const errors = ast.errors.slice(0, 10).map(yamlError => {
      const [start, end] = yamlError.pos;
      return map.errorForRange('YAML error', [start, end, end], yamlError);
    });

    const error = fromArray(errors);
    // `errors` is never empty here, so `error` is never null.
    if (error) {
      throw error;
    }
  }

  return {
    source,
    ast,
    map,
  };
}
