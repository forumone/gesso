// @vitest-environment jsdom
import { afterEach, describe, expect, it } from 'vitest';
import Drupal from 'drupal';
import './html.es6';

describe('setJSCLass behavior', () => {
  afterEach(() => {
    document.documentElement.className = '';
  });

  it('removes the no-js class and adds the js class', () => {
    document.documentElement.classList.add('no-js');
    Drupal.behaviors.setJSCLass.attach();

    expect(document.documentElement.classList.contains('no-js')).toBe(false);
    expect(document.documentElement.classList.contains('js')).toBe(true);
  });
});
