import { describe, expect, it } from 'vitest';
import fieldValue from './fieldValue.ts';
import { render } from './testUtils.ts';

const r = (template: string, context = {}) =>
  render(fieldValue, template, context);

describe('field_value', () => {
  it('returns strings unchanged', () => {
    expect(r(`{{ v|field_value }}`, { v: 'hello' })).toBe('hello');
  });

  it('returns objects unchanged', () => {
    expect(r(`{{ v|field_value|json_encode }}`, { v: { a: 1 } })).toBe(
      '{"a":1}'
    );
  });
});
