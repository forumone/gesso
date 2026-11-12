import { describe, expect, it } from 'vitest';
import createAttribute from './createAttribute.ts';
import { render } from './testUtils.ts';

const r = (template: string, context = {}) =>
  render(createAttribute, template, context);

describe('create_attribute', () => {
  it('returns the attributes it was given', () => {
    expect(
      r(`{{ create_attribute({ class: ['a'], id: 'i' })|json_encode }}`)
    ).toBe('{"class":["a"],"id":"i"}');
  });

  it('returns an empty object with no arguments', () => {
    expect(r(`{{ create_attribute()|json_encode }}`)).toBe('{}');
  });

  // Regression: non-object arguments used to be returned as-is, breaking
  // later merges with add_attributes.
  it('returns an empty object for non-object arguments', () => {
    expect(r(`{{ create_attribute('nope')|json_encode }}`)).toBe('{}');
  });
});
