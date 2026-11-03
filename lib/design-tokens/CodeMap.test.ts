import { describe, expect, it } from 'vitest';

import { CodeMap } from './CodeMap.ts';

const source = 'a: 1\nb: 2\nc: 3';

describe('CodeMap', () => {
  it('maps the offset of each newline to the following line number', () => {
    const map = new CodeMap(source);

    expect(map.source).toBe(source);
    expect([...map.positions]).toEqual([
      [4, 2],
      [9, 3],
    ]);
  });

  it('has no positions for a single-line source', () => {
    expect(new CodeMap('a: 1').positions.size).toBe(0);
  });

  describe('getSource', () => {
    it('returns the line containing a range in the middle of the file', () => {
      expect(new CodeMap(source).getSource(5, 6)).toEqual({
        source: 'b: 2',
        startLine: 2,
        endLine: 2,
      });
    });

    it('returns multiple lines for a multi-line range', () => {
      expect(new CodeMap(source).getSource(0, 8)).toEqual({
        source: 'a: 1\nb: 2',
        startLine: 1,
        endLine: 2,
      });
    });

    // Regression: a range on the first line used to report line `undefined`,
    // and the end line was off by one.
    it('reports line numbers for a range on the first line', () => {
      expect(new CodeMap(source).getSource(0, 1)).toEqual({
        source: 'a: 1',
        startLine: 1,
        endLine: 1,
      });
    });

    it('reports line numbers for a range on the last line', () => {
      expect(new CodeMap(source).getSource(10, 11)).toEqual({
        source: 'c: 3',
        startLine: 3,
        endLine: 3,
      });
    });

    it('handles a single-line source', () => {
      expect(new CodeMap('a: 1').getSource(0, 4)).toEqual({
        source: 'a: 1',
        startLine: 1,
        endLine: 1,
      });
    });

    // Regression: a range starting on a newline was attributed to the next line.
    it('attributes a range that starts on a newline to the line it ends', () => {
      expect(new CodeMap(source).getSource(4, 4)).toMatchObject({
        source: 'a: 1',
        startLine: 1,
      });
    });
  });

  describe('errorForRange', () => {
    it('creates an error with the line number and source info', () => {
      const cause = new Error('boom');
      const error = new CodeMap(source).errorForRange(
        'Bad thing',
        [5, 6, 6],
        cause
      );

      expect(error.message).toContain('Bad thing on line 2');
      expect(error.info).toEqual({ source: 'b: 2', startLine: 2, endLine: 2 });
      expect(error.cause).toBe(cause);
    });

    it('reports line 1 for the first line', () => {
      const error = new CodeMap(source).errorForRange('Bad', [0, 1, 1]);

      expect(error.message).toContain('Bad on line 1');
    });
  });
});
