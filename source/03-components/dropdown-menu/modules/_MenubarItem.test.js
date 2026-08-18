// @vitest-environment jsdom
import { describe, expect, it, vi } from 'vitest';
import MenubarItem from './_MenubarItem.es6';
import PopupMenu from './_PopupMenu.es6';

function createMenuItemMarkup(withSubnav = true) {
  const li = document.createElement('li');
  li.innerHTML = withSubnav
    ? '<a href="#">Item</a><ul class="c-dropdown-menu__subnav"><li><a href="#">Sub 0</a></li></ul>'
    : '<a href="#">Item</a>';
  document.body.appendChild(li);
  return li.querySelector('a');
}

function createMenuStub(options = {}) {
  return {
    options: {
      useArrowKeys: true,
      displayMenuOnHover: true,
      submenuSelector: '.c-dropdown-menu__subnav',
      ...options,
    },
    menuItems: [],
    setFocusToPreviousItem: vi.fn(),
    setFocusToNextItem: vi.fn(),
    setFocusToFirstItem: vi.fn(),
    setFocusToLastItem: vi.fn(),
  };
}

describe('MenubarItem', () => {
  it('creates and initializes a PopupMenu when a submenu is present', () => {
    const domNode = createMenuItemMarkup();
    const item = new MenubarItem(domNode, createMenuStub());
    item.init();
    expect(item.popupMenu).toBeInstanceOf(PopupMenu);
  });

  it('does not create a PopupMenu when no submenu is present', () => {
    const domNode = createMenuItemMarkup(false);
    const item = new MenubarItem(domNode, createMenuStub());
    item.init();
    expect(item.popupMenu).toBe(false);
  });

  it('opens the popup and focuses the first item on Space/ArrowDown', () => {
    const domNode = createMenuItemMarkup();
    const item = new MenubarItem(domNode, createMenuStub());
    item.init();
    const openSpy = vi.spyOn(item.popupMenu, 'open');
    const focusSpy = vi.spyOn(item.popupMenu, 'setFocusToFirstItem');

    const event = new KeyboardEvent('keydown', { key: 'ArrowDown' });
    domNode.dispatchEvent(event);

    expect(openSpy).toHaveBeenCalled();
    expect(focusSpy).toHaveBeenCalled();
  });

  it('opens the popup and focuses the last item on ArrowUp', () => {
    const domNode = createMenuItemMarkup();
    const item = new MenubarItem(domNode, createMenuStub());
    item.init();
    const openSpy = vi.spyOn(item.popupMenu, 'open');
    const focusSpy = vi.spyOn(item.popupMenu, 'setFocusToLastItem');

    domNode.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowUp' }));

    expect(openSpy).toHaveBeenCalled();
    expect(focusSpy).toHaveBeenCalled();
  });

  it('navigates to sibling items on ArrowLeft/ArrowRight', () => {
    const domNode = createMenuItemMarkup(false);
    const menuStub = createMenuStub();
    const item = new MenubarItem(domNode, menuStub);
    item.init();

    domNode.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowLeft' }));
    expect(menuStub.setFocusToPreviousItem).toHaveBeenCalledWith(item);

    domNode.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight' }));
    expect(menuStub.setFocusToNextItem).toHaveBeenCalledWith(item);
  });

  it('navigates to the first/last item on Home/End', () => {
    const domNode = createMenuItemMarkup(false);
    const menuStub = createMenuStub();
    const item = new MenubarItem(domNode, menuStub);
    item.init();

    domNode.dispatchEvent(new KeyboardEvent('keydown', { key: 'Home' }));
    expect(menuStub.setFocusToFirstItem).toHaveBeenCalled();

    domNode.dispatchEvent(new KeyboardEvent('keydown', { key: 'End' }));
    expect(menuStub.setFocusToLastItem).toHaveBeenCalled();
  });

  it('closes the popup on Tab and Escape', () => {
    const domNode = createMenuItemMarkup();
    const item = new MenubarItem(domNode, createMenuStub());
    item.init();
    const closeSpy = vi.spyOn(item.popupMenu, 'close');

    domNode.dispatchEvent(new KeyboardEvent('keydown', { key: 'Tab' }));
    expect(closeSpy).toHaveBeenCalledWith(true);

    domNode.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    expect(closeSpy).toHaveBeenCalledWith(true);
  });

  it('still handles Escape when useArrowKeys is disabled', () => {
    const domNode = createMenuItemMarkup();
    const item = new MenubarItem(
      domNode,
      createMenuStub({ useArrowKeys: false })
    );
    item.init();
    const closeSpy = vi.spyOn(item.popupMenu, 'close');

    domNode.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));

    expect(closeSpy).toHaveBeenCalledWith(true);
  });

  it('ignores ArrowDown navigation when useArrowKeys is disabled', () => {
    const domNode = createMenuItemMarkup();
    const item = new MenubarItem(
      domNode,
      createMenuStub({ useArrowKeys: false })
    );
    item.init();
    const openSpy = vi.spyOn(item.popupMenu, 'open');

    domNode.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));

    expect(openSpy).not.toHaveBeenCalled();
  });

  it('toggles the popup on button click', () => {
    const li = document.createElement('li');
    li.innerHTML =
      '<button>Item</button><ul class="c-dropdown-menu__subnav"><li><a href="#">Sub 0</a></li></ul>';
    document.body.appendChild(li);
    const domNode = li.querySelector('button');

    const item = new MenubarItem(domNode, createMenuStub());
    item.init();
    const openSpy = vi.spyOn(item.popupMenu, 'open');

    domNode.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    expect(openSpy).toHaveBeenCalled();

    domNode.setAttribute('aria-expanded', 'true');
    const closeSpy = vi.spyOn(item.popupMenu, 'close');
    domNode.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    expect(closeSpy).toHaveBeenCalledWith(true);
  });

  it('destroys its popup menu and click listener', () => {
    const li = document.createElement('li');
    li.innerHTML =
      '<button>Item</button><ul class="c-dropdown-menu__subnav"><li><a href="#">Sub 0</a></li></ul>';
    document.body.appendChild(li);
    const domNode = li.querySelector('button');
    const item = new MenubarItem(domNode, createMenuStub());
    item.init();
    const popupDestroySpy = vi.spyOn(item.popupMenu, 'destroy');

    item.destroy();

    expect(popupDestroySpy).toHaveBeenCalled();
  });
});
