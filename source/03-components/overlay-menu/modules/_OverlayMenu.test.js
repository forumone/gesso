// @vitest-environment jsdom
import { afterEach, describe, expect, it, vi } from 'vitest';
import OverlayMenu from './_OverlayMenu.es6';

function createOverlay() {
  const overlay = document.createElement('nav');
  overlay.id = 'my-overlay';
  overlay.innerHTML = `
    <button id="link-0">Link 0</button>
    <a href="#" id="link-1">Link 1</a>
    <button id="link-2">Link 2</button>
  `;
  document.body.appendChild(overlay);
  return overlay;
}

describe('OverlayMenu', () => {
  afterEach(() => {
    document.body.innerHTML = '';
  });

  it('creates a menu button and close button when none are provided', () => {
    const overlay = createOverlay();
    const menu = new OverlayMenu(overlay);
    menu.init();

    expect(menu.menuButton).toBeInstanceOf(HTMLButtonElement);
    expect(menu.closeButton).toBeInstanceOf(HTMLButtonElement);
    expect(menu.menuButton.getAttribute('aria-controls')).toBe('my-overlay');
  });

  it('disables tabbing on overlay contents on init', () => {
    const overlay = createOverlay();
    const menu = new OverlayMenu(overlay);
    menu.init();

    overlay.querySelectorAll('button, [href]').forEach(el => {
      expect(el.getAttribute('tabindex')).toBe('-1');
    });
  });

  it('opens the menu: toggles button visibility, classes, and enables tabbing', () => {
    const overlay = createOverlay();
    const menu = new OverlayMenu(overlay);
    menu.init();

    menu.openMenu();

    expect(menu.menuButton.hidden).toBe(true);
    expect(menu.closeButton.hidden).toBe(false);
    expect(overlay.classList.contains('is-open')).toBe(true);
    expect(document.body.classList.contains('has-open-menu')).toBe(true);
    overlay.querySelectorAll('button, [href]').forEach(el => {
      expect(el.getAttribute('tabindex')).toBe('0');
    });
  });

  it('closes the menu: toggles button visibility, classes, and disables tabbing', () => {
    const overlay = createOverlay();
    const menu = new OverlayMenu(overlay);
    menu.init();
    menu.openMenu();

    menu.closeMenu();

    expect(menu.menuButton.hidden).toBe(false);
    expect(menu.closeButton.hidden).toBe(true);
    expect(overlay.classList.contains('is-open')).toBe(false);
    expect(document.body.classList.contains('has-open-menu')).toBe(false);
    overlay.querySelectorAll('button, [href]').forEach(el => {
      expect(el.getAttribute('tabindex')).toBe('-1');
    });
  });

  it('toggleMenu opens when closed and closes when open', () => {
    const overlay = createOverlay();
    const menu = new OverlayMenu(overlay);
    menu.init();

    menu.toggleMenu();
    expect(overlay.classList.contains('is-open')).toBe(true);

    menu.toggleMenu();
    expect(overlay.classList.contains('is-open')).toBe(false);
  });

  it('opens the menu on menu button click and closes on close button click', () => {
    const overlay = createOverlay();
    const menu = new OverlayMenu(overlay);
    menu.init();

    menu.menuButton.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    expect(overlay.classList.contains('is-open')).toBe(true);

    menu.closeButton.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    expect(overlay.classList.contains('is-open')).toBe(false);
  });

  it('closes the menu on Escape while open', () => {
    const overlay = createOverlay();
    const menu = new OverlayMenu(overlay);
    menu.init();
    menu.openMenu();

    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));

    expect(overlay.classList.contains('is-open')).toBe(false);
  });

  it('does not listen for keydown until the menu is opened', () => {
    const overlay = createOverlay();
    const menu = new OverlayMenu(overlay);
    menu.init();
    const handleKeydownSpy = vi.spyOn(menu, 'handleKeydown');

    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    expect(handleKeydownSpy).not.toHaveBeenCalled();
  });

  it('traps focus by wrapping Tab from the last focusable element to the first', () => {
    const overlay = createOverlay();
    const menu = new OverlayMenu(overlay);
    menu.init();
    menu.openMenu();

    const focusable = overlay.querySelectorAll('button, [href]');
    const last = focusable[focusable.length - 1];
    last.focus();

    const event = new KeyboardEvent('keydown', { key: 'Tab', bubbles: true });
    const preventDefaultSpy = vi.spyOn(event, 'preventDefault');
    window.dispatchEvent(event);

    expect(preventDefaultSpy).toHaveBeenCalled();
    expect(document.activeElement).toBe(focusable[0]);
  });

  it('traps focus by wrapping Shift+Tab from the first focusable element to the last', () => {
    const overlay = createOverlay();
    const menu = new OverlayMenu(overlay);
    menu.init();
    menu.openMenu();

    const focusable = overlay.querySelectorAll('button, [href]');
    focusable[0].focus();

    const event = new KeyboardEvent('keydown', {
      key: 'Tab',
      shiftKey: true,
      bubbles: true,
    });
    window.dispatchEvent(event);

    expect(document.activeElement).toBe(focusable[focusable.length - 1]);
  });

  it('uses provided menu and close buttons instead of creating new ones', () => {
    const overlay = createOverlay();
    const menuButton = document.createElement('button');
    const closeButton = document.createElement('button');
    document.body.appendChild(menuButton);
    document.body.appendChild(closeButton);

    const menu = new OverlayMenu(overlay, { menuButton, closeButton });
    menu.init();

    expect(menu.menuButton).toBe(menuButton);
    expect(menu.closeButton).toBe(closeButton);
  });
});
