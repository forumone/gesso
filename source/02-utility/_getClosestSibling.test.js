// @vitest-environment jsdom
import { describe, expect, it } from 'vitest';
import { getNextSibling, getPreviousSibling } from './_getClosestSibling.es6';

describe('getNextSibling', () => {
  it('returns the immediate next sibling when no selector is given', () => {
    document.body.innerHTML = '<div id="start"></div><span id="next"></span>';
    const start = document.getElementById('start');
    expect(getNextSibling(start)).toBe(document.getElementById('next'));
  });

  it('returns the next sibling that matches the selector', () => {
    document.body.innerHTML =
      '<div id="start"></div><span></span><p class="match" id="match"></p>';
    const start = document.getElementById('start');
    expect(getNextSibling(start, '.match')).toBe(
      document.getElementById('match')
    );
  });

  it('returns null when no next sibling matches the selector', () => {
    document.body.innerHTML = '<div id="start"></div><span></span>';
    const start = document.getElementById('start');
    expect(getNextSibling(start, '.match')).toBeNull();
  });

  it('returns null when there is no next sibling', () => {
    document.body.innerHTML = '<div id="start"></div>';
    const start = document.getElementById('start');
    expect(getNextSibling(start)).toBeNull();
  });
});

describe('getPreviousSibling', () => {
  it('returns the immediate previous sibling when no selector is given', () => {
    document.body.innerHTML = '<span id="prev"></span><div id="start"></div>';
    const start = document.getElementById('start');
    expect(getPreviousSibling(start)).toBe(document.getElementById('prev'));
  });

  it('returns the previous sibling that matches the selector', () => {
    document.body.innerHTML =
      '<p class="match" id="match"></p><span></span><div id="start"></div>';
    const start = document.getElementById('start');
    expect(getPreviousSibling(start, '.match')).toBe(
      document.getElementById('match')
    );
  });

  it('returns null when no previous sibling matches the selector', () => {
    document.body.innerHTML = '<span></span><div id="start"></div>';
    const start = document.getElementById('start');
    expect(getPreviousSibling(start, '.match')).toBeNull();
  });

  it('returns null when there is no previous sibling', () => {
    document.body.innerHTML = '<div id="start"></div>';
    const start = document.getElementById('start');
    expect(getPreviousSibling(start)).toBeNull();
  });
});
