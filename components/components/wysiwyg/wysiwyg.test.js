// @vitest-environment jsdom
import { afterEach, describe, expect, it } from 'vitest';
import Drupal from 'drupal';
import './wysiwyg.es6';

function createWysiwygMarkup(tableHtml) {
  const wysiwyg = document.createElement('div');
  wysiwyg.setAttribute('data-wysiwyg', '');
  wysiwyg.innerHTML = tableHtml;
  document.body.appendChild(wysiwyg);
  return wysiwyg;
}

describe('wysiwyg behavior', () => {
  afterEach(() => {
    document.body.innerHTML = '';
  });

  it('wraps a table in a responsive table container', () => {
    const wysiwyg = createWysiwygMarkup(
      '<table><tr><td>Cell</td></tr></table>'
    );

    Drupal.behaviors.wysiwyg.attach(document.body);

    const wrapper = wysiwyg.querySelector('.l-responsive-table');
    expect(wrapper).toBeTruthy();
    expect(wrapper.querySelector('table')).toBeTruthy();
    expect(wrapper.getAttribute('role')).toBe('region');
    expect(wrapper.getAttribute('tabindex')).toBe('0');
  });

  it('uses the table caption for aria-labelledby when present', () => {
    const wysiwyg = createWysiwygMarkup(
      '<table><caption>My caption</caption><tr><td>Cell</td></tr></table>'
    );

    Drupal.behaviors.wysiwyg.attach(document.body);

    const wrapper = wysiwyg.querySelector('.l-responsive-table');
    const caption = wrapper.querySelector('caption');
    expect(caption.id).toBeTruthy();
    expect(wrapper.getAttribute('aria-labelledby')).toBe(caption.id);
    expect(wrapper.hasAttribute('aria-label')).toBe(false);
  });

  it('uses a generic aria-label when there is no caption', () => {
    const wysiwyg = createWysiwygMarkup(
      '<table><tr><td>Cell</td></tr></table>'
    );

    Drupal.behaviors.wysiwyg.attach(document.body);

    const wrapper = wysiwyg.querySelector('.l-responsive-table');
    expect(wrapper.getAttribute('aria-label')).toBe('Table');
  });

  it('does not double-wrap a table that already has a responsive wrapper', () => {
    const wysiwyg = createWysiwygMarkup(
      '<div class="l-responsive-table"><table><tr><td>Cell</td></tr></table></div>'
    );

    Drupal.behaviors.wysiwyg.attach(document.body);

    const wrappers = wysiwyg.querySelectorAll('.l-responsive-table');
    expect(wrappers).toHaveLength(1);
  });

  it('wraps multiple tables independently', () => {
    const wysiwyg = createWysiwygMarkup(
      '<table><tr><td>One</td></tr></table><table><tr><td>Two</td></tr></table>'
    );

    Drupal.behaviors.wysiwyg.attach(document.body);

    const wrappers = wysiwyg.querySelectorAll('.l-responsive-table');
    expect(wrappers).toHaveLength(2);
  });

  it('does nothing when there is no wysiwyg content', () => {
    document.body.innerHTML = '<div>No wysiwyg here</div>';
    expect(() => Drupal.behaviors.wysiwyg.attach(document.body)).not.toThrow();
  });
});
