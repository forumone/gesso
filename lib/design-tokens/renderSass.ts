import { NaniError } from 'nani';

import { isRecord } from '../utils/isRecord.ts';
import { cleanValue } from './cleanValue.ts';
import { SassValue } from './SassValue.ts';
import { toError } from './toError.ts';
import type { GessoObject } from './types.ts';

/**
 * Transform the data into a Sass map.
 */
export function createSassMap(data: GessoObject, indent = 2): string {
  let output = '';
  const prefix = ' '.repeat(indent);

  output += '(\n';
  Object.entries(data).forEach(([key, value]) => {
    output += `${prefix}${key}: `;
    if (typeof value === 'number' || typeof value === 'string') {
      output += String(cleanValue(value));
    } else if (value === null || value === undefined) {
      output += 'null';
    } else if (value instanceof SassValue) {
      // Don't output the 'fallback' field for raw Sass.
      output += String(value.sass);
    } else if (typeof value === 'boolean') {
      // Booleans are valid Sass values. (Previously they fell through to the
      // map branch and rendered as an empty map.)
      output += String(value);
    } else {
      output += createSassMap(value as GessoObject, indent + 2);
    }
    output += ',\n';
  });
  output += `${' '.repeat(indent - 2)})`;

  return output;
}

/**
 * Prepare the data to be output in Sass.
 */
export function renderSass(data: string | { gesso: GessoObject }): string {
  if (typeof data === 'string') {
    return data;
  }
  if (!isRecord(data)) {
    throw new NaniError({
      shortMessage: `Expecting non-array object for rendering sass; got ${data === null ? 'null' : typeof data}`,
    });
  }

  try {
    return `$gesso: ${createSassMap(data.gesso)};`;
  } catch (error) {
    throw new NaniError({
      shortMessage: 'Unable to compile tokens to Sass',
      cause: toError(error),
    });
  }
}
