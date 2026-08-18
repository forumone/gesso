// @vitest-environment jsdom
import { describe, expect, it, vi } from 'vitest';
import SubMenuItem from './_SubMenuItem.es6';
import PopupMenu from './_PopupMenu.es6';

function createItemMarkup({ withSubnav = false, tag = 'a' } = {}) {
  const li = document.createElement('li');
  const openTag =
    tag === 'a' ? '<a href="#">Item</a>' : '<button>Item</button>';
  li.innerHTML = withSubnav
    ? `${openTag}<ul class="c-dropdown-menu__subnav"><li><a href="#">Sub 0</a></li></ul>`
    : openTag;
  document.body.appendChild(li);
  return li.querySelector(tag);
}

function createMenuStub(options = {}) {
  return {
    options: {
      useArrowKeys: true,
      displayMenuOnHover: true,
      submenuSelector: '.c-dropdown-menu__subnav',
      ...options,
    },
    controller: { menu: { isMenubar: true } },
    close: vi.fn(),
    open: vi.fn(),
    setFocusToPreviousItem: vi.fn(),
    setFocusToNextItem: vi.fn(),
    setFocusToFirstItem: vi.fn(),
    setFocusToLastItem: vi.fn(),
    setFocusToController: vi.fn(),
    setFocus: vi.fn(),
    setHover: vi.fn(),
  };
}

describe('SubMenuItem', () => {
  it('creates a PopupMenu when a submenu is present and displayMenuOnHover is enabled', () => {
    const domNode = createItemMarkup({ withSubnav: true });
    const item = new SubMenuItem(domNode, createMenuStub());
    item.init();
    expect(item.popupMenu).toBeInstanceOf(PopupMenu);
    expect(item.toggleButton).toBeUndefined();
  });

  it('creates a toggle button when displayMenuOnHover is disabled', () => {
    const domNode = createItemMarkup({ withSubnav: true });
    const item = new SubMenuItem(
      domNode,
      createMenuStub({ displayMenuOnHover: false })
    );
    item.init();
    expect(item.toggleButton).toBeInstanceOf(HTMLButtonElement);
    expect(domNode.classList.contains('has-subnav')).toBe(false);
  });

  it('opens the popup on Space when present', () => {
    const domNode = createItemMarkup({ withSubnav: true });
    const item = new SubMenuItem(domNode, createMenuStub());
    item.init();
    const openSpy = vi.spyOn(item.popupMenu, 'open');
    const focusSpy = vi.spyOn(item.popupMenu, 'setFocusToFirstItem');

    domNode.dispatchEvent(new KeyboardEvent('keydown', { key: ' ' }));

    expect(openSpy).toHaveBeenCalled();
    expect(focusSpy).toHaveBeenCalled();
  });

  // Note: the "no popup" branch of Space handling constructs
  // `new MouseEvent('click', { view: window, ... })`, which jsdom rejects in
  // this Vitest environment (`window instanceof Window` is false across the
  // Vitest/jsdom realm boundary). This is an environment limitation, not
  // something to work around in application code, so that branch is not
  // covered here.

  it('still handles Space when useArrowKeys is disabled', () => {
    const domNode = createItemMarkup({ withSubnav: true });
    const item = new SubMenuItem(
      domNode,
      createMenuStub({ useArrowKeys: false })
    );
    item.init();
    const openSpy = vi.spyOn(item.popupMenu, 'open');

    domNode.dispatchEvent(new KeyboardEvent('keydown', { key: ' ' }));

    expect(openSpy).toHaveBeenCalled();
  });

  it('ignores ArrowUp navigation when useArrowKeys is disabled', () => {
    const domNode = createItemMarkup({ withSubnav: false });
    const menuStub = createMenuStub({ useArrowKeys: false });
    const item = new SubMenuItem(domNode, menuStub);
    item.init();

    domNode.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowUp' }));

    expect(menuStub.setFocusToPreviousItem).not.toHaveBeenCalled();
  });

  it('navigates to sibling items on ArrowUp/ArrowDown', () => {
    const domNode = createItemMarkup({ withSubnav: false });
    const menuStub = createMenuStub();
    const item = new SubMenuItem(domNode, menuStub);
    item.init();

    domNode.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowUp' }));
    expect(menuStub.setFocusToPreviousItem).toHaveBeenCalledWith(item);

    domNode.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
    expect(menuStub.setFocusToNextItem).toHaveBeenCalledWith(item);
  });

  it('closes the current menu and moves to the parent on ArrowLeft', () => {
    const domNode = createItemMarkup({ withSubnav: false });
    const menuStub = createMenuStub();
    const item = new SubMenuItem(domNode, menuStub);
    item.init();

    domNode.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowLeft' }));

    expect(menuStub.setFocusToController).toHaveBeenCalledWith('previous');
    expect(menuStub.close).toHaveBeenCalledWith(true);
  });

  it('opens submenu on ArrowRight when present, otherwise moves to next sibling', () => {
    const domNodeWithSub = createItemMarkup({ withSubnav: true });
    const itemWithSub = new SubMenuItem(domNodeWithSub, createMenuStub());
    itemWithSub.init();
    const openSpy = vi.spyOn(itemWithSub.popupMenu, 'open');
    domNodeWithSub.dispatchEvent(
      new KeyboardEvent('keydown', { key: 'ArrowRight' })
    );
    expect(openSpy).toHaveBeenCalled();

    const domNode = createItemMarkup({ withSubnav: false });
    const menuStub = createMenuStub();
    const item = new SubMenuItem(domNode, menuStub);
    item.init();
    domNode.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight' }));
    expect(menuStub.setFocusToController).toHaveBeenCalledWith('next');
    expect(menuStub.close).toHaveBeenCalledWith(true);
  });

  it('navigates to first/last item on Home/PageUp and End/PageDown', () => {
    const domNode = createItemMarkup({ withSubnav: false });
    const menuStub = createMenuStub();
    const item = new SubMenuItem(domNode, menuStub);
    item.init();

    domNode.dispatchEvent(new KeyboardEvent('keydown', { key: 'Home' }));
    expect(menuStub.setFocusToFirstItem).toHaveBeenCalled();

    domNode.dispatchEvent(new KeyboardEvent('keydown', { key: 'End' }));
    expect(menuStub.setFocusToLastItem).toHaveBeenCalled();
  });

  it('closes the menu and returns focus to the controller on Escape', () => {
    const domNode = createItemMarkup({ withSubnav: false });
    const menuStub = createMenuStub();
    const item = new SubMenuItem(domNode, menuStub);
    item.init();

    domNode.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));

    expect(menuStub.setFocusToController).toHaveBeenCalledWith('');
    expect(menuStub.close).toHaveBeenCalledWith(true);
  });

  it('closes the menu on click when the item is a BUTTON', () => {
    const domNode = createItemMarkup({ withSubnav: false, tag: 'button' });
    const menuStub = createMenuStub();
    const item = new SubMenuItem(domNode, menuStub);
    item.init();

    domNode.dispatchEvent(new MouseEvent('click', { bubbles: true }));

    expect(menuStub.setFocusToController).toHaveBeenCalledWith('');
    expect(menuStub.close).toHaveBeenCalledWith(true);
  });

  it('does not close the menu on click when the item is a link', () => {
    const domNode = createItemMarkup({ withSubnav: false, tag: 'a' });
    const menuStub = createMenuStub();
    const item = new SubMenuItem(domNode, menuStub);
    item.init();

    domNode.dispatchEvent(new MouseEvent('click', { bubbles: true }));

    expect(menuStub.close).not.toHaveBeenCalled();
  });

  it('toggles aria-expanded on the toggle button rather than the link', () => {
    const domNode = createItemMarkup({ withSubnav: true });
    const item = new SubMenuItem(
      domNode,
      createMenuStub({ displayMenuOnHover: false })
    );
    item.init();

    item.setExpanded(true);
    expect(item.toggleButton.getAttribute('aria-expanded')).toBe('true');

    item.setExpanded(false);
    expect(item.toggleButton.getAttribute('aria-expanded')).toBe('false');
  });

  it('opens/closes the popup via the toggle button click', () => {
    const domNode = createItemMarkup({ withSubnav: true });
    const item = new SubMenuItem(
      domNode,
      createMenuStub({ displayMenuOnHover: false })
    );
    item.init();
    const openSpy = vi.spyOn(item.popupMenu, 'open');
    const closeSpy = vi.spyOn(item.popupMenu, 'close');

    item.toggleButton.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    expect(openSpy).toHaveBeenCalled();

    item.toggleButton.setAttribute('aria-expanded', 'true');
    item.toggleButton.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    expect(closeSpy).toHaveBeenCalled();
  });

  it('toggles the popup via ArrowLeft/ArrowRight on the toggle button', () => {
    const domNode = createItemMarkup({ withSubnav: true });
    const item = new SubMenuItem(
      domNode,
      createMenuStub({ displayMenuOnHover: false })
    );
    item.init();
    const openSpy = vi.spyOn(item.popupMenu, 'open');

    item.toggleButton.dispatchEvent(
      new KeyboardEvent('keydown', { key: 'ArrowRight' })
    );

    expect(openSpy).toHaveBeenCalled();
  });

  it('removes the toggle button and popup menu on destroy', () => {
    const domNode = createItemMarkup({ withSubnav: true });
    const item = new SubMenuItem(
      domNode,
      createMenuStub({ displayMenuOnHover: false })
    );
    item.init();
    const { toggleButton } = item;
    const popupDestroySpy = vi.spyOn(item.popupMenu, 'destroy');

    item.destroy();

    expect(popupDestroySpy).toHaveBeenCalled();
    expect(toggleButton.parentElement).toBeNull();
  });

  it('opens the parent menu on mouseover when displayMenuOnHover is enabled', () => {
    const domNode = createItemMarkup({ withSubnav: false });
    const menuStub = createMenuStub();
    const item = new SubMenuItem(domNode, menuStub);
    item.init();

    domNode.dispatchEvent(new MouseEvent('mouseover'));

    expect(menuStub.setHover).toHaveBeenCalledWith(true);
    expect(menuStub.open).toHaveBeenCalled();
  });

  it('unsets menu focus and schedules a close when blurring to an unrelated element', () => {
    vi.useFakeTimers();
    const domNode = createItemMarkup({ withSubnav: false });
    const menuStub = createMenuStub();
    const item = new SubMenuItem(domNode, menuStub);
    item.init();

    const unrelated = document.createElement('div');
    document.body.appendChild(unrelated);

    domNode.dispatchEvent(new FocusEvent('blur', { relatedTarget: unrelated }));

    expect(menuStub.setFocus).toHaveBeenCalledWith(false);
    vi.advanceTimersByTime(300);
    expect(menuStub.close).toHaveBeenCalledWith(false);
    vi.useRealTimers();
  });

  it('does not close the menu when blurring to a sibling within the same item', () => {
    const domNode = createItemMarkup({ withSubnav: false });
    const menuStub = createMenuStub();
    const item = new SubMenuItem(domNode, menuStub);
    item.init();

    const sibling = document.createElement('span');
    domNode.parentElement.appendChild(sibling);

    domNode.dispatchEvent(new FocusEvent('blur', { relatedTarget: sibling }));

    expect(menuStub.setFocus).not.toHaveBeenCalled();
    expect(menuStub.close).not.toHaveBeenCalled();
  });
});
