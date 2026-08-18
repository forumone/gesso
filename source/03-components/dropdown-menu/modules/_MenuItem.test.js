// @vitest-environment jsdom
import { describe, expect, it, vi } from 'vitest';
import MenuItem from './_MenuItem.es6';

function createLink() {
  const link = document.createElement('a');
  link.href = '#';
  document.body.appendChild(link);
  return link;
}

function createMenuStub(options = {}) {
  return {
    options: {
      displayMenuOnHover: true,
      ...options,
    },
    setFocus: vi.fn(),
    setFocusToPreviousItem: vi.fn(),
    setFocusToNextItem: vi.fn(),
  };
}

describe('MenuItem', () => {
  it('binds event handlers on init', () => {
    const link = createLink();
    const addSpy = vi.spyOn(link, 'addEventListener');
    const menuItem = new MenuItem(link, createMenuStub());
    menuItem.init();

    expect(addSpy).toHaveBeenCalledWith('keydown', menuItem.handleKeydown);
    expect(addSpy).toHaveBeenCalledWith('focus', menuItem.handleFocus);
    expect(addSpy).toHaveBeenCalledWith('blur', menuItem.handleBlur);
    expect(addSpy).toHaveBeenCalledWith('mouseover', menuItem.handleMouseover);
    expect(addSpy).toHaveBeenCalledWith('mouseout', menuItem.handleMouseout);
  });

  it('removes event handlers on destroy', () => {
    const link = createLink();
    const menuItem = new MenuItem(link, createMenuStub());
    menuItem.init();
    const removeSpy = vi.spyOn(link, 'removeEventListener');
    menuItem.destroy();

    expect(removeSpy).toHaveBeenCalledWith('keydown', menuItem.handleKeydown);
    expect(removeSpy).toHaveBeenCalledWith('focus', menuItem.handleFocus);
    expect(removeSpy).toHaveBeenCalledWith('blur', menuItem.handleBlur);
    expect(removeSpy).toHaveBeenCalledWith(
      'mouseover',
      menuItem.handleMouseover
    );
    expect(removeSpy).toHaveBeenCalledWith('mouseout', menuItem.handleMouseout);
  });

  it('sets aria-expanded true/false via setExpanded', () => {
    const link = createLink();
    const menuItem = new MenuItem(link, createMenuStub());
    menuItem.setExpanded(true);
    expect(link.getAttribute('aria-expanded')).toBe('true');
    menuItem.setExpanded(false);
    expect(link.getAttribute('aria-expanded')).toBe('false');
  });

  it('sets the menu to focused on handleFocus and unfocused on handleBlur', () => {
    const link = createLink();
    const menuStub = createMenuStub();
    const menuItem = new MenuItem(link, menuStub);
    menuItem.handleFocus();
    expect(menuStub.setFocus).toHaveBeenCalledWith(true);
    menuItem.handleBlur({});
    expect(menuStub.setFocus).toHaveBeenCalledWith(false);
  });

  it('opens the popup menu on mouseover when displayMenuOnHover is enabled', () => {
    const link = createLink();
    const menuStub = createMenuStub({ displayMenuOnHover: true });
    const menuItem = new MenuItem(link, menuStub);
    menuItem.popupMenu = { setHover: vi.fn(), open: vi.fn(), close: vi.fn() };

    menuItem.handleMouseover();

    expect(menuItem.hasHover).toBe(true);
    expect(menuItem.popupMenu.setHover).toHaveBeenCalledWith(true);
    expect(menuItem.popupMenu.open).toHaveBeenCalled();
  });

  it('does not open the popup menu on mouseover when displayMenuOnHover is disabled', () => {
    const link = createLink();
    const menuStub = createMenuStub({ displayMenuOnHover: false });
    const menuItem = new MenuItem(link, menuStub);
    menuItem.popupMenu = { setHover: vi.fn(), open: vi.fn(), close: vi.fn() };

    menuItem.handleMouseover();

    expect(menuItem.popupMenu.open).not.toHaveBeenCalled();
  });

  it('closes the popup menu on mouseout after a delay when displayMenuOnHover is enabled', () => {
    vi.useFakeTimers();
    const link = createLink();
    const menuStub = createMenuStub({ displayMenuOnHover: true });
    const menuItem = new MenuItem(link, menuStub);
    menuItem.popupMenu = { setHover: vi.fn(), open: vi.fn(), close: vi.fn() };

    menuItem.handleMouseout();
    expect(menuItem.hasHover).toBe(false);
    expect(menuItem.popupMenu.setHover).toHaveBeenCalledWith(false);
    expect(menuItem.popupMenu.close).not.toHaveBeenCalled();

    vi.advanceTimersByTime(300);
    expect(menuItem.popupMenu.close).toHaveBeenCalledWith(false);
    vi.useRealTimers();
  });

  it('focuses itself, and delegates sibling navigation to the menu', () => {
    const link = createLink();
    const focusSpy = vi.spyOn(link, 'focus');
    const menuStub = createMenuStub();
    const menuItem = new MenuItem(link, menuStub);

    menuItem.focusOnSelf();
    expect(focusSpy).toHaveBeenCalled();

    menuItem.focusOnPreviousSibling();
    expect(menuStub.setFocusToPreviousItem).toHaveBeenCalledWith(menuItem);

    menuItem.focusOnNextSibling();
    expect(menuStub.setFocusToNextItem).toHaveBeenCalledWith(menuItem);
  });

  it('returns the bounding rect for getBoundaries', () => {
    const link = createLink();
    const menuItem = new MenuItem(link, createMenuStub());
    const rect = menuItem.getBoundaries();
    expect(rect).toBeDefined();
  });

  it('reports isMenubarItem and hover state', () => {
    const link = createLink();
    const menuItem = new MenuItem(link, createMenuStub());
    expect(menuItem.getIsMenubarItem()).toBe(false);
    expect(menuItem.getHover()).toBe(false);
    menuItem.hasHover = true;
    expect(menuItem.getHover()).toBe(true);
  });
});
