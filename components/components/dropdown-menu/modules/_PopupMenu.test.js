// @vitest-environment jsdom
import { describe, expect, it, vi } from 'vitest';
import PopupMenu from './_PopupMenu.es6';
import SubMenuItem from './_SubMenuItem.es6';

function createSubmenuMarkup() {
  const submenu = document.createElement('ul');
  submenu.innerHTML = `
    <li><a href="#">Sub 0</a></li>
    <li><a href="#">Sub 1</a></li>
  `;
  document.body.appendChild(submenu);
  return submenu;
}

function createController({ isMenubarItem = false } = {}) {
  return {
    domNode: document.createElement('a'),
    getBoundaries: vi.fn(() => ({ width: 120, height: 40 })),
    getIsMenubarItem: vi.fn(() => isMenubarItem),
    getHover: vi.fn(() => false),
    setExpanded: vi.fn(),
    focusOnSelf: vi.fn(),
    focusOnPreviousSibling: vi.fn(),
    focusOnNextSibling: vi.fn(),
    menu: { options: { displayMenuOnHover: true } },
  };
}

describe('PopupMenu', () => {
  it('creates SubMenuItem instances for its children on init', () => {
    const popup = new PopupMenu(createSubmenuMarkup(), createController());
    popup.init();
    expect(popup.menuItems).toHaveLength(2);
    popup.menuItems.forEach(item => {
      expect(item).toBeInstanceOf(SubMenuItem);
    });
  });

  it('positions itself absolutely below the controller when a menubar item', () => {
    const controller = createController({ isMenubarItem: true });
    const popup = new PopupMenu(createSubmenuMarkup(), controller);
    popup.open();

    expect(popup.domNode.style.display).toBe('block');
    expect(popup.domNode.style.position).toBe('absolute');
    expect(popup.domNode.style.top).toBe('39px');
    expect(controller.setExpanded).toHaveBeenCalledWith(true);
  });

  it('positions itself to the side when not a menubar item', () => {
    const controller = createController({ isMenubarItem: false });
    const popup = new PopupMenu(createSubmenuMarkup(), controller);
    popup.open();

    expect(popup.domNode.style.left).toBe('120px');
    expect(controller.setExpanded).toHaveBeenCalledWith(true);
  });

  it('closes and hides itself when forced', () => {
    const controller = createController();
    const popup = new PopupMenu(createSubmenuMarkup(), controller);
    popup.open();
    popup.close(true);

    expect(popup.domNode.style.display).toBe('none');
    expect(controller.setExpanded).toHaveBeenCalledWith(false);
  });

  it('does not close when it has focus and force is not set', () => {
    const controller = createController();
    const popup = new PopupMenu(createSubmenuMarkup(), controller);
    popup.open();
    popup.hasFocus = true;
    popup.close(false);

    expect(popup.domNode.style.display).not.toBe('none');
  });

  it('closes submenus of its items when closing', () => {
    const controller = createController();
    const popup = new PopupMenu(createSubmenuMarkup(), controller);
    const submenuClose = vi.fn();
    popup.menuItems = [{ popupMenu: { close: submenuClose, hasFocus: false } }];

    popup.close(true);

    expect(submenuClose).toHaveBeenCalledWith(true);
  });

  it('delegates focus to the controller via setFocusToController', () => {
    const controller = createController();
    const popup = new PopupMenu(createSubmenuMarkup(), controller);

    popup.setFocusToController();
    expect(controller.focusOnSelf).toHaveBeenCalled();

    popup.setFocusToController('previous');
    expect(controller.focusOnPreviousSibling).toHaveBeenCalled();

    popup.setFocusToController('next');
    expect(controller.focusOnNextSibling).toHaveBeenCalled();
  });

  it('sets hover state on mouseover/mouseout when displayMenuOnHover is enabled', () => {
    const controller = createController();
    const popup = new PopupMenu(createSubmenuMarkup(), controller);
    popup.init();

    popup.domNode.dispatchEvent(new MouseEvent('mouseover'));
    expect(popup.hasHover).toBe(true);

    popup.domNode.dispatchEvent(new MouseEvent('mouseout'));
    expect(popup.hasHover).toBe(false);
  });

  it('does not set hover state when displayMenuOnHover is disabled', () => {
    const controller = createController();
    controller.menu.options.displayMenuOnHover = false;
    const popup = new PopupMenu(createSubmenuMarkup(), controller, {
      displayMenuOnHover: false,
    });
    popup.init();

    popup.domNode.dispatchEvent(new MouseEvent('mouseover'));
    expect(popup.hasHover).toBe(false);
  });

  it('removes both mouseover and mouseout listeners on destroy', () => {
    const controller = createController();
    const popup = new PopupMenu(createSubmenuMarkup(), controller);
    popup.init();
    popup.destroy();

    popup.domNode.dispatchEvent(new MouseEvent('mouseover'));
    expect(popup.hasHover).toBe(false);

    popup.hasHover = true;
    popup.domNode.dispatchEvent(new MouseEvent('mouseout'));
    expect(popup.hasHover).toBe(true);
  });
});
