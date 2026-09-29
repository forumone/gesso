import { describe, expect, it } from 'vitest';
import moduleJS from './_module-js';

describe('moduleJS', () => {
  it('returns the expected pass string', () => {
    expect(moduleJS()).toBe('PASS 2/2');
  });
});
