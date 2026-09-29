// @vitest-environment jsdom
import { describe, expect, it, vi } from 'vitest';
import Menu from './_Menu.es6';

function createMenuMarkup() {
  const menu = document.createElement('ul');
  menu.innerHTML = `
    <li><a href="#">Item 0</a></li>
    <li><a href="#">Item 1</a></li>
    <li><a href="#">Item 2</a></li>
  `;
  document.body.appendChild(menu);
  return menu;
}

class TestMenuItem {
  constructor(domNode) {
    this.domNode = domNode;
    this.destroyed = false;
  }

  init() {}

  destroy() {
    this.destroyed = true;
  }
}

class TestMenu extends Menu {
  createMenuItem(menuElement) {
    return new TestMenuItem(menuElement);
  }
}

describe('Menu', () => {
  it('defaults options when none are provided', () => {
    const menu = new TestMenu(createMenuMarkup());
    expect(menu.options).toEqual({
      useArrowKeys: true,
      displayMenuOnHover: true,
      submenuSelector: '.c-dropdown-menu__subnav',
    });
  });

  it('creates a menu item for each valid child link', () => {
    const menu = new TestMenu(createMenuMarkup());
    menu.init();
    expect(menu.menuItems).toHaveLength(3);
  });

  it('sets the first and last item after init', () => {
    const menu = new TestMenu(createMenuMarkup());
    menu.init();
    expect(menu.firstItem).toBe(menu.menuItems[0]);
    expect(menu.lastItem).toBe(menu.menuItems[2]);
  });

  it('turns off displayMenuOnHover when a top-level item is a button', () => {
    const domNode = document.createElement('ul');
    domNode.innerHTML = '<li><button>Item 0</button></li>';
    document.body.appendChild(domNode);
    const menu = new TestMenu(domNode);
    menu.init();
    expect(menu.options.displayMenuOnHover).toBe(false);
  });

  it('ignores children whose first element is not a link or button', () => {
    const domNode = document.createElement('ul');
    domNode.innerHTML = '<li><span>Not a link</span></li>';
    document.body.appendChild(domNode);
    const menu = new TestMenu(domNode);
    menu.init();
    expect(menu.menuItems).toHaveLength(0);
    expect(menu.firstItem).toBeNull();
    expect(menu.lastItem).toBeNull();
  });

  it('destroys all menu items', () => {
    const menu = new TestMenu(createMenuMarkup());
    menu.init();
    menu.destroy();
    menu.menuItems.forEach(item => {
      expect(item.destroyed).toBe(true);
    });
  });

  it('sets focus and hover state', () => {
    const menu = new TestMenu(createMenuMarkup());
    menu.setFocus(true);
    expect(menu.hasFocus).toBe(true);
    menu.setHover(true);
    expect(menu.hasHover).toBe(true);
  });

  it('sets focus to a specific item', () => {
    const menu = new TestMenu(createMenuMarkup());
    menu.init();
    const focusSpy = vi.spyOn(menu.menuItems[1].domNode, 'focus');
    menu.setFocusToItem(menu.menuItems[1]);
    expect(focusSpy).toHaveBeenCalled();
  });

  it('sets focus to first and last items', () => {
    const menu = new TestMenu(createMenuMarkup());
    menu.init();
    const firstSpy = vi.spyOn(menu.firstItem.domNode, 'focus');
    const lastSpy = vi.spyOn(menu.lastItem.domNode, 'focus');
    menu.setFocusToFirstItem();
    menu.setFocusToLastItem();
    expect(firstSpy).toHaveBeenCalled();
    expect(lastSpy).toHaveBeenCalled();
  });

  it('wraps to the last item when navigating previous from the first item', () => {
    const menu = new TestMenu(createMenuMarkup());
    menu.init();
    const lastSpy = vi.spyOn(menu.lastItem.domNode, 'focus');
    menu.setFocusToPreviousItem(menu.firstItem);
    expect(lastSpy).toHaveBeenCalled();
  });

  it('moves to the previous item in the middle of the menu', () => {
    const menu = new TestMenu(createMenuMarkup());
    menu.init();
    const previousSpy = vi.spyOn(menu.menuItems[0].domNode, 'focus');
    menu.setFocusToPreviousItem(menu.menuItems[1]);
    expect(previousSpy).toHaveBeenCalled();
  });

  it('wraps to the first item when navigating next from the last item', () => {
    const menu = new TestMenu(createMenuMarkup());
    menu.init();
    const firstSpy = vi.spyOn(menu.firstItem.domNode, 'focus');
    menu.setFocusToNextItem(menu.lastItem);
    expect(firstSpy).toHaveBeenCalled();
  });

  it('moves to the next item in the middle of the menu', () => {
    const menu = new TestMenu(createMenuMarkup());
    menu.init();
    const nextSpy = vi.spyOn(menu.menuItems[2].domNode, 'focus');
    menu.setFocusToNextItem(menu.menuItems[1]);
    expect(nextSpy).toHaveBeenCalled();
  });

  it('validates A and BUTTON as valid tags only', () => {
    const menu = new TestMenu(createMenuMarkup());
    expect(menu.isValidTag('A')).toBe(true);
    expect(menu.isValidTag('BUTTON')).toBe(true);
    expect(menu.isValidTag('SPAN')).toBe(false);
  });
});
