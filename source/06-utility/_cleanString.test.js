import { describe, expect, it } from 'vitest';
import cleanString from './_cleanString.es6';

describe('cleanString', () => {
  it('lowercases the input', () => {
    expect(cleanString('HELLO')).toBe('hello');
  });

  it('replaces a single space with a hyphen', () => {
    expect(cleanString('hello world')).toBe('hello-world');
  });

  it('replaces all spaces with hyphens', () => {
    expect(cleanString('hello world again')).toBe('hello-world-again');
  });

  it('returns the string unchanged when there are no spaces', () => {
    expect(cleanString('hello')).toBe('hello');
  });

  it('returns an empty string when given an empty string', () => {
    expect(cleanString('')).toBe('');
  });
});
