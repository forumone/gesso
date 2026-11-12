import type { GessoData, GessoObject } from './types.ts';

/**
 * Transform the data into a JSON string.
 */
export function createJsonMap(data: GessoData): string {
  return JSON.stringify(data, null, 2);
}

/**
 * Prepare the data to be output in JavaScript.
 */
export function renderJs(data: { gesso?: GessoObject }): string {
  let output = '';
  if (data.gesso) {
    Object.entries(data.gesso).forEach(([key, value]) => {
      const name = key.toUpperCase().replace(/-/g, '_');
      const json = createJsonMap(value);
      output += `export const ${name} = ${json};\n\n`;
    });
  }
  return output;
}
