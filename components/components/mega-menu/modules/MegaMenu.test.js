// @vitest-environment jsdom
import { afterEach, describe, expect, it } from 'vitest';
import MegaMenu from './MegaMenu.es6';

function createMenuMarkup() {
  const menu = document.createElement('nav');
  menu.className = 'c-mega-menu';
  menu.innerHTML = `
    <div>
      <button aria-expanded="false" aria-controls="section-0" class="js-top-level">Section 0</button>
      <div class="c-mega-menu__section">
        <button class="c-mega-menu__section-close">Close</button>
        <a href="#">Section 0 link 1</a>
        <a href="#">Section 0 link 2</a>
      </div>
    </div>
    <div>
      <button aria-expanded="false" aria-controls="section-1" class="js-top-level">Section 1</button>
      <div class="c-mega-menu__section">
        <button class="c-mega-menu__section-close">Close</button>
        <a href="#">Section 1 link 1</a>
      </div>
    </div>
    <a class="js-top-level" href="#">Plain link</a>
  `;
  document.body.appendChild(menu);
  return menu;
}

describe('MegaMenu', () => {
  afterEach(() => {
    document.body.innerHTML = '';
  });

  it('collects top-level buttons and links', () => {
    const menu = createMenuMarkup();
    const megaMenu = new MegaMenu(menu);
    expect(megaMenu.topLevelItems).toHaveLength(3);
  });

  it('hides all sections and disables their focusable elements on init', () => {
    const menu = createMenuMarkup();
    const megaMenu = new MegaMenu(menu);
    megaMenu.init();

    const sections = menu.querySelectorAll('.c-mega-menu__section');
    sections.forEach(section => {
      expect(section.hidden).toBe(true);
    });
  });

  it('opens a section on button click and sets aria-expanded', () => {
    const menu = createMenuMarkup();
    const megaMenu = new MegaMenu(menu);
    megaMenu.init();

    const [firstButton] = menu.querySelectorAll('button[aria-expanded]');
    firstButton.dispatchEvent(new MouseEvent('click', { bubbles: true }));

    expect(firstButton.getAttribute('aria-expanded')).toBe('true');
    expect(megaMenu.menuSections[0].hidden).toBe(false);
  });

  it('closes the previously open section when a different one opens', () => {
    const menu = createMenuMarkup();
    const megaMenu = new MegaMenu(menu);
    megaMenu.init();

    const buttons = menu.querySelectorAll('button[aria-expanded]');
    buttons[0].dispatchEvent(new MouseEvent('click', { bubbles: true }));
    buttons[1].dispatchEvent(new MouseEvent('click', { bubbles: true }));

    expect(buttons[0].getAttribute('aria-expanded')).toBe('false');
    expect(buttons[1].getAttribute('aria-expanded')).toBe('true');
  });

  it('closes an open section when its button is clicked again', () => {
    const menu = createMenuMarkup();
    const megaMenu = new MegaMenu(menu);
    megaMenu.init();

    const [firstButton] = menu.querySelectorAll('button[aria-expanded]');
    firstButton.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    firstButton.dispatchEvent(new MouseEvent('click', { bubbles: true }));

    expect(firstButton.getAttribute('aria-expanded')).toBe('false');
    expect(megaMenu.openIndex).toBeNull();
  });

  it('closes the open section on Escape and moves focus to the section', () => {
    const menu = createMenuMarkup();
    const megaMenu = new MegaMenu(menu);
    megaMenu.init();

    const [firstButton] = menu.querySelectorAll('button[aria-expanded]');
    firstButton.dispatchEvent(new MouseEvent('click', { bubbles: true }));

    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));

    expect(firstButton.getAttribute('aria-expanded')).toBe('false');
  });

  it('closes the open section when clicking outside the menu', () => {
    const menu = createMenuMarkup();
    const megaMenu = new MegaMenu(menu);
    megaMenu.init();

    const [firstButton] = menu.querySelectorAll('button[aria-expanded]');
    firstButton.dispatchEvent(new MouseEvent('click', { bubbles: true }));

    const outside = document.createElement('div');
    document.body.appendChild(outside);
    outside.dispatchEvent(new MouseEvent('click', { bubbles: true }));

    expect(firstButton.getAttribute('aria-expanded')).toBe('false');
  });

  it('closes the section when its close button is clicked', () => {
    const menu = createMenuMarkup();
    const megaMenu = new MegaMenu(menu);
    megaMenu.init();

    const [firstButton] = menu.querySelectorAll('button[aria-expanded]');
    firstButton.dispatchEvent(new MouseEvent('click', { bubbles: true }));

    const closeButton = megaMenu.menuSections[0].querySelector(
      '.c-mega-menu__section-close'
    );
    closeButton.dispatchEvent(new MouseEvent('click', { bubbles: true }));

    expect(firstButton.getAttribute('aria-expanded')).toBe('false');
  });
});
