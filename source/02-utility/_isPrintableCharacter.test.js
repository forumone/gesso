import { describe, expect, it } from 'vitest';
import isPrintableCharacter from './_isPrintableCharacter.es6';

describe('isPrintableCharacter', () => {
  it('returns a truthy value for a single letter', () => {
    expect(isPrintableCharacter('a')).toBeTruthy();
  });

  it('returns a truthy value for a single digit', () => {
    expect(isPrintableCharacter('5')).toBeTruthy();
  });

  it('returns a truthy value for a single symbol', () => {
    expect(isPrintableCharacter('!')).toBeTruthy();
  });

  it('returns a falsy value for a single space', () => {
    expect(isPrintableCharacter(' ')).toBeFalsy();
  });

  it('returns a falsy value for an empty string', () => {
    expect(isPrintableCharacter('')).toBeFalsy();
  });

  it('returns a falsy value for a multi-character string', () => {
    expect(isPrintableCharacter('ab')).toBeFalsy();
  });
});
