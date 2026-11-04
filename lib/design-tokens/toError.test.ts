import { describe, expect, it } from 'vitest';
import { toError } from './toError.ts';

describe('toError', () => {
  it('returns Error instances unchanged', () => {
    const error = new Error('boom');
    expect(toError(error)).toBe(error);
  });

  it('wraps other values in an Error', () => {
    const wrapped = toError('boom');
    expect(wrapped).toBeInstanceOf(Error);
    expect(wrapped.message).toBe('boom');
  });
});
