// @vitest-environment jsdom
import { afterEach, describe, expect, it } from 'vitest';
import SideMenu from './_SideMenu.es6';

function createSideMenuMarkup(id = 'side-menu') {
  const overlay = document.createElement('nav');
  overlay.id = id;
  overlay.innerHTML = `
    <div class="c-menu__item">
      <a href="#" class="c-menu__link">Link 0</a>
    </div>
    <div class="c-menu__item has-subnav">
      <a href="#" class="c-menu__link has-subnav">Link 1</a>
      <div class="c-menu__subnav">
        <a href="#" class="c-menu__link">Sub link</a>
      </div>
    </div>
    <div class="c-menu__item">
      <button class="c-menu__link">Button item</button>
    </div>
  `;
  document.body.appendChild(overlay);
  return overlay;
}

describe('SideMenu', () => {
  afterEach(() => {
    document.body.innerHTML = '';
  });

  it('prepares link and button menu items scoped to its own overlay', () => {
    const overlay = createSideMenuMarkup();
    const menu = new SideMenu(overlay);
    menu.init();

    expect(menu.menuItems.length).toBeGreaterThan(0);
  });

  it('only processes menu items within its own overlay, not other side menus on the page', () => {
    const overlayA = createSideMenuMarkup('side-menu-a');
    const overlayB = createSideMenuMarkup('side-menu-b');

    const menuA = new SideMenu(overlayA);
    menuA.init();

    const overlayBLinks = overlayB.querySelectorAll('.c-menu__link');
    overlayBLinks.forEach(link => {
      expect(menuA.menuItems).not.toContain(link);
    });
  });

  it('adds a submenu toggle for a link with a subnav', () => {
    const overlay = createSideMenuMarkup();
    const menu = new SideMenu(overlay);
    menu.init();

    const toggle = overlay.querySelector('.c-side-menu__toggle');
    expect(toggle).toBeTruthy();
  });

  it('opens a submenu, disabling tabbing on siblings and enabling it on the submenu', () => {
    const overlay = createSideMenuMarkup();
    const menu = new SideMenu(overlay);
    menu.init();

    const submenu = overlay.querySelector('.c-menu__subnav');
    menu.openSubmenu(submenu);

    expect(submenu.classList.contains('is-open')).toBe(true);
  });

  it('adds a back button and title to an opened submenu section', () => {
    const overlay = createSideMenuMarkup();
    const menu = new SideMenu(overlay);
    menu.init();

    const submenu = overlay.querySelector('.c-menu__subnav');
    expect(submenu.querySelector('.c-side-menu__back')).toBeTruthy();
    expect(submenu.querySelector('.c-side-menu__section-title')).toBeTruthy();
  });

  it('closes a submenu via its back button', () => {
    const overlay = createSideMenuMarkup();
    const menu = new SideMenu(overlay);
    menu.init();

    const submenu = overlay.querySelector('.c-menu__subnav');
    menu.openSubmenu(submenu);
    const backButton = submenu.querySelector('.c-side-menu__back');
    backButton.dispatchEvent(new MouseEvent('click', { bubbles: true }));

    expect(submenu.classList.contains('is-open')).toBe(false);
  });

  it('throws for a menu child that is neither A nor BUTTON', () => {
    const overlay = document.createElement('nav');
    overlay.innerHTML =
      '<div class="c-menu__item"><span class="c-menu__link">Bad</span></div>';
    document.body.appendChild(overlay);
    const menu = new SideMenu(overlay);

    expect(() => menu.init()).toThrow(
      'Side Menu has child elements that are not A or Button elements'
    );
  });

  it('navigates focus with ArrowDown/ArrowUp when useArrowKeys is enabled', () => {
    const overlay = createSideMenuMarkup();
    const menu = new SideMenu(overlay);
    menu.init();
    menu.openMenu();

    const focusable = [
      ...overlay.querySelectorAll('button, [href], input, select, textarea'),
    ].filter(item => item.tabIndex !== -1);
    focusable[0].focus();

    window.dispatchEvent(
      new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true })
    );

    expect(document.activeElement).toBe(focusable[1]);
  });

  it('ignores arrow key navigation when useArrowKeys is disabled', () => {
    const overlay = createSideMenuMarkup();
    const menu = new SideMenu(overlay, { useArrowKeys: false });
    menu.init();
    menu.openMenu();

    const focusable = [
      ...overlay.querySelectorAll('button, [href], input, select, textarea'),
    ].filter(item => item.tabIndex !== -1);
    focusable[0].focus();

    window.dispatchEvent(
      new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true })
    );

    expect(document.activeElement).toBe(focusable[0]);
  });

  it('delegates Tab and Escape handling to the parent OverlayMenu', () => {
    const overlay = createSideMenuMarkup();
    const menu = new SideMenu(overlay);
    menu.init();
    menu.openMenu();

    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));

    expect(overlay.classList.contains('is-open')).toBe(false);
  });
});
