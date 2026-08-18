// @vitest-environment jsdom
import { afterEach, describe, expect, it } from 'vitest';
import Drupal from 'drupal';
import './accordion.es6';

function nextFrame() {
  return new Promise(resolve => {
    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(resolve);
    });
  });
}

async function finishSlide(panel) {
  await nextFrame();
  panel.dispatchEvent(new Event('transitionend'));
  await new Promise(resolve => setTimeout(resolve, 0));
}

function createAccordion({ allowMultiple = false, allowToggle = false } = {}) {
  const accordion = document.createElement('div');
  accordion.classList.add('js-accordion');
  if (allowMultiple) accordion.setAttribute('data-allow-multiple', '');
  if (allowToggle) accordion.setAttribute('data-allow-toggle', '');

  accordion.innerHTML = `
    <div class="js-accordion-item" id="item-0">
      <button class="js-accordion-toggle" aria-expanded="false" aria-controls="panel-0">Item 0</button>
      <div id="panel-0"></div>
    </div>
    <div class="js-accordion-item" id="item-1">
      <button class="js-accordion-toggle" aria-expanded="false" aria-controls="panel-1">Item 1</button>
      <div id="panel-1"></div>
    </div>
    <div class="js-accordion-item" id="item-2">
      <button class="js-accordion-toggle" aria-expanded="false" aria-controls="panel-2">Item 2</button>
      <div id="panel-2"></div>
    </div>
  `;
  document.body.appendChild(accordion);
  accordion.querySelectorAll('[id^="panel-"]').forEach(panel => {
    Object.defineProperty(panel, 'offsetHeight', {
      configurable: true,
      value: 50,
    });
  });
  return accordion;
}

describe('accordion behavior', () => {
  afterEach(() => {
    document.body.innerHTML = '';
  });

  it('closes all non-default-open items on init', () => {
    const accordion = createAccordion();
    Drupal.behaviors.accordion.attach(document.body);

    const toggles = accordion.querySelectorAll('.js-accordion-toggle');
    toggles.forEach(toggle => {
      expect(toggle.getAttribute('aria-expanded')).toBe('false');
    });
  });

  it('marks accordion items as processed and removes toggle tabindex', () => {
    const accordion = createAccordion();
    Drupal.behaviors.accordion.attach(document.body);

    accordion.querySelectorAll('.js-accordion-item').forEach(item => {
      expect(item.hasAttribute('accordion-processed')).toBe(true);
    });
    accordion.querySelectorAll('.js-accordion-toggle').forEach(toggle => {
      expect(toggle.hasAttribute('tabindex')).toBe(false);
    });
  });

  it('opens an item on toggle click', async () => {
    const accordion = createAccordion();
    Drupal.behaviors.accordion.attach(document.body);

    const toggle = accordion.querySelector('#item-0 .js-accordion-toggle');
    toggle.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    await nextFrame();

    expect(toggle.getAttribute('aria-expanded')).toBe('true');
  });

  it('closes other open items when a new one opens without allowMultiple', async () => {
    const accordion = createAccordion({ allowMultiple: false });
    Drupal.behaviors.accordion.attach(document.body);

    const toggle0 = accordion.querySelector('#item-0 .js-accordion-toggle');
    const toggle1 = accordion.querySelector('#item-1 .js-accordion-toggle');
    const panel0 = accordion.querySelector('#panel-0');

    toggle0.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    await finishSlide(panel0);
    toggle1.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    await nextFrame();

    expect(toggle0.getAttribute('aria-expanded')).toBe('false');
    expect(toggle1.getAttribute('aria-expanded')).toBe('true');
  });

  it('allows multiple open items with allowMultiple', async () => {
    const accordion = createAccordion({ allowMultiple: true });
    Drupal.behaviors.accordion.attach(document.body);

    const toggle0 = accordion.querySelector('#item-0 .js-accordion-toggle');
    const toggle1 = accordion.querySelector('#item-1 .js-accordion-toggle');

    toggle0.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    await nextFrame();
    toggle1.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    await nextFrame();

    expect(toggle0.getAttribute('aria-expanded')).toBe('true');
    expect(toggle1.getAttribute('aria-expanded')).toBe('true');
  });

  it('closes an open item on click when allowToggle is set', async () => {
    const accordion = createAccordion({
      allowMultiple: true,
      allowToggle: true,
    });
    Drupal.behaviors.accordion.attach(document.body);

    const toggle0 = accordion.querySelector('#item-0 .js-accordion-toggle');
    const panel0 = accordion.querySelector('#panel-0');
    toggle0.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    await finishSlide(panel0);
    expect(toggle0.getAttribute('aria-expanded')).toBe('true');

    toggle0.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    await nextFrame();
    expect(toggle0.getAttribute('aria-expanded')).toBe('false');
  });

  it('does not close an open item on click when allowToggle is disabled', async () => {
    const accordion = createAccordion({
      allowMultiple: false,
      allowToggle: false,
    });
    Drupal.behaviors.accordion.attach(document.body);

    const toggle0 = accordion.querySelector('#item-0 .js-accordion-toggle');
    const panel0 = accordion.querySelector('#panel-0');
    toggle0.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    await finishSlide(panel0);
    expect(toggle0.getAttribute('aria-expanded')).toBe('true');

    toggle0.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    await nextFrame();
    expect(toggle0.getAttribute('aria-expanded')).toBe('true');
  });

  it('forces allowToggle on when allowMultiple is enabled, even if data-allow-toggle is absent', async () => {
    const accordion = createAccordion({
      allowMultiple: true,
      allowToggle: false,
    });
    Drupal.behaviors.accordion.attach(document.body);

    const toggle0 = accordion.querySelector('#item-0 .js-accordion-toggle');
    const panel0 = accordion.querySelector('#panel-0');
    toggle0.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    await finishSlide(panel0);
    expect(toggle0.getAttribute('aria-expanded')).toBe('true');

    toggle0.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    await nextFrame();
    expect(toggle0.getAttribute('aria-expanded')).toBe('false');
  });

  it('sets aria-disabled on an expanded item that cannot be toggled closed', () => {
    const accordion = createAccordion({
      allowMultiple: false,
      allowToggle: false,
    });
    const toggle0 = accordion.querySelector('#item-0 .js-accordion-toggle');
    toggle0.setAttribute('aria-expanded', 'true');
    accordion.querySelector('#item-0').setAttribute('data-accordion-open', '');

    Drupal.behaviors.accordion.attach(document.body);

    expect(toggle0.getAttribute('aria-disabled')).toBe('true');
  });

  it('moves focus to the next/previous toggle with ArrowDown/ArrowUp', () => {
    const accordion = createAccordion();
    Drupal.behaviors.accordion.attach(document.body);

    const toggles = accordion.querySelectorAll('.js-accordion-toggle');
    toggles[0].focus();
    toggles[0].dispatchEvent(
      new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true })
    );
    expect(document.activeElement).toBe(toggles[1]);

    toggles[1].dispatchEvent(
      new KeyboardEvent('keydown', { key: 'ArrowUp', bubbles: true })
    );
    expect(document.activeElement).toBe(toggles[0]);
  });

  it('wraps focus from the last toggle to the first with ArrowDown', () => {
    const accordion = createAccordion();
    Drupal.behaviors.accordion.attach(document.body);

    const toggles = accordion.querySelectorAll('.js-accordion-toggle');
    toggles[2].focus();
    toggles[2].dispatchEvent(
      new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true })
    );
    expect(document.activeElement).toBe(toggles[0]);
  });

  it('moves focus to first/last toggle with Home/End', () => {
    const accordion = createAccordion();
    Drupal.behaviors.accordion.attach(document.body);

    const toggles = accordion.querySelectorAll('.js-accordion-toggle');
    toggles[1].focus();
    toggles[1].dispatchEvent(
      new KeyboardEvent('keydown', { key: 'End', bubbles: true })
    );
    expect(document.activeElement).toBe(toggles[2]);

    toggles[2].dispatchEvent(
      new KeyboardEvent('keydown', { key: 'Home', bubbles: true })
    );
    expect(document.activeElement).toBe(toggles[0]);
  });

  it('adds a focus class to the accordion when a toggle is focused, removes it on blur', () => {
    const accordion = createAccordion();
    Drupal.behaviors.accordion.attach(document.body);

    const toggle = accordion.querySelector('.js-accordion-toggle');
    toggle.dispatchEvent(new FocusEvent('focus'));
    expect(accordion.classList.contains('focus')).toBe(true);

    toggle.dispatchEvent(new FocusEvent('blur'));
    expect(accordion.classList.contains('focus')).toBe(false);
  });

  it('does not process the same accordion twice (once guard)', () => {
    const accordion = createAccordion();
    Drupal.behaviors.accordion.attach(document.body);
    Drupal.behaviors.accordion.attach(document.body);

    const toggle = accordion.querySelector('#item-0 .js-accordion-toggle');
    toggle.dispatchEvent(new MouseEvent('click', { bubbles: true }));

    expect(toggle.getAttribute('aria-expanded')).toBe('true');
  });
});
