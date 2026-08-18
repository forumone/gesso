// @vitest-environment jsdom
import { afterEach, describe, expect, it, vi } from 'vitest';
import MobileMenu from './_MobileMenu.es6';

function createMenuMarkup() {
  const menu = document.createElement('nav');
  menu.className = 'dropdown-menu';
  menu.innerHTML = `
    <div class="dropdown-menu__item">
      <a href="#" class="dropdown-menu__link">Link 0</a>
    </div>
    <div class="dropdown-menu__item">
      <a href="#" class="dropdown-menu__link" aria-controls="subnav-1">Link 1</a>
      <ul id="subnav-1" class="dropdown-menu__subnav">
        <li><a href="#" class="dropdown-menu__link">Sub link</a></li>
      </ul>
    </div>
  `;
  document.body.appendChild(menu);
  return menu;
}

function createContext({ withSearch = true, withUtilityNav = true } = {}) {
  const context = document.createElement('div');
  if (withSearch) {
    const search = document.createElement('div');
    search.className = 'search';
    search.innerHTML = '<input id="search-input" />';
    context.appendChild(search);
  }
  if (withUtilityNav) {
    const utilityNav = document.createElement('nav');
    utilityNav.className = 'c-menu--utility';
    utilityNav.innerHTML =
      '<a href="#" class="dropdown-menu__link">Utility link</a>';
    context.appendChild(utilityNav);
  }
  document.body.appendChild(context);
  return context;
}

describe('MobileMenu', () => {
  afterEach(() => {
    document.body.innerHTML = '';
  });

  it('does nothing on init when there is no menu', () => {
    const context = createContext();
    const mobileMenu = new MobileMenu(null, context, {
      classPrefix: 'dropdown-menu',
    });
    expect(() => mobileMenu.init()).not.toThrow();
  });

  it('creates an overlay element after the original menu', () => {
    const menu = createMenuMarkup();
    const context = createContext();
    const mobileMenu = new MobileMenu(menu, context, {
      classPrefix: 'dropdown-menu',
    });
    mobileMenu.init();

    expect(mobileMenu.overlay).toBeInstanceOf(HTMLElement);
    expect(mobileMenu.overlay.classList.contains('c-mobile-menu')).toBe(true);
    expect(mobileMenu.overlay.parentElement).toBe(document.body);
  });

  it('clones the search block into the overlay when provided', () => {
    const menu = createMenuMarkup();
    const context = createContext();
    const mobileMenu = new MobileMenu(menu, context, {
      classPrefix: 'dropdown-menu',
    });
    mobileMenu.init();

    const clonedSearch = mobileMenu.overlay.querySelector(
      '.c-mobile-menu__search'
    );
    expect(clonedSearch).toBeTruthy();
  });

  it('gives ids ending in -mobile to elements cloned from the search block', () => {
    const menu = createMenuMarkup();
    const context = createContext();
    const mobileMenu = new MobileMenu(menu, context, {
      classPrefix: 'dropdown-menu',
    });
    mobileMenu.init();

    const clonedInput = mobileMenu.overlay.querySelector(
      '#search-input-mobile'
    );
    expect(clonedInput).toBeTruthy();
  });

  it('omits the search block when searchBlockClass is null', () => {
    const menu = createMenuMarkup();
    const context = createContext();
    const mobileMenu = new MobileMenu(menu, context, {
      classPrefix: 'dropdown-menu',
      searchBlockClass: null,
    });
    mobileMenu.init();

    expect(
      mobileMenu.overlay.querySelector('.c-mobile-menu__search')
    ).toBeNull();
  });

  it('clones the utility nav into the overlay when provided', () => {
    const menu = createMenuMarkup();
    const context = createContext();
    const mobileMenu = new MobileMenu(menu, context, {
      classPrefix: 'dropdown-menu',
    });
    mobileMenu.init();

    const utilityLinks = mobileMenu.overlay.querySelectorAll(
      '.c-mobile-menu__menu .c-mobile-menu__link'
    );
    const hasUtilityLink = Array.from(utilityLinks).some(link =>
      link.textContent.includes('Utility link')
    );
    expect(hasUtilityLink).toBe(true);
  });

  it('swaps classPrefix classes for c-mobile-menu classes on the cloned menu', () => {
    const menu = createMenuMarkup();
    const context = createContext();
    const mobileMenu = new MobileMenu(menu, context, {
      classPrefix: 'dropdown-menu',
    });
    mobileMenu.init();

    const clonedItems = mobileMenu.overlay.querySelectorAll(
      '.c-mobile-menu__item'
    );
    expect(clonedItems.length).toBeGreaterThan(0);
    clonedItems.forEach(item => {
      expect(item.classList.contains('dropdown-menu__item')).toBe(false);
    });
  });

  it('creates a toggle button for a submenu when toggleSubnav is enabled', () => {
    const menu = createMenuMarkup();
    const context = createContext();
    const mobileMenu = new MobileMenu(menu, context, {
      classPrefix: 'dropdown-menu',
      toggleSubnav: true,
    });
    mobileMenu.init();

    const toggle = mobileMenu.overlay.querySelector(
      '.c-mobile-menu__subnav-arrow'
    );
    expect(toggle).toBeTruthy();
    const subnav = mobileMenu.overlay.querySelector('.c-mobile-menu__subnav');
    expect(subnav.style.display).toBe('none');
  });

  it('toggles the submenu open and closed via the toggle button', () => {
    const menu = createMenuMarkup();
    const context = createContext();
    const mobileMenu = new MobileMenu(menu, context, {
      classPrefix: 'dropdown-menu',
      toggleSubnav: true,
    });
    mobileMenu.init();

    const toggle = mobileMenu.overlay.querySelector(
      '.c-mobile-menu__subnav-arrow'
    );
    toggle.dispatchEvent(new MouseEvent('click', { bubbles: true }));

    const subnav = mobileMenu.overlay.querySelector('.c-mobile-menu__subnav');
    expect(toggle.getAttribute('aria-expanded')).toBe('true');
    expect(subnav.style.display).toBe('block');
    expect(subnav.classList.contains('is-open')).toBe(true);

    toggle.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    expect(toggle.getAttribute('aria-expanded')).toBe('false');
    expect(subnav.style.display).toBe('none');
    expect(subnav.classList.contains('is-open')).toBe(false);
  });

  it('applies the toggle-subnav class variant when toggleSubnav is enabled', () => {
    const menu = createMenuMarkup();
    const context = createContext();
    const mobileMenu = new MobileMenu(menu, context, {
      classPrefix: 'dropdown-menu',
      toggleSubnav: true,
    });
    mobileMenu.init();

    const clonedMenu = mobileMenu.overlay.querySelector(
      '.c-mobile-menu__menu--toggle-subnav'
    );
    expect(clonedMenu).toBeTruthy();
  });

  it('applies the show-subnav class variant when toggleSubnav is disabled', () => {
    const menu = createMenuMarkup();
    const context = createContext();
    const mobileMenu = new MobileMenu(menu, context, {
      classPrefix: 'dropdown-menu',
      toggleSubnav: false,
    });
    mobileMenu.init();

    const clonedMenu = mobileMenu.overlay.querySelector(
      '.c-mobile-menu__menu--show-subnav'
    );
    expect(clonedMenu).toBeTruthy();
    expect(
      mobileMenu.overlay.querySelector('.c-mobile-menu__subnav-arrow')
    ).toBeNull();
  });

  it('shows the mobile menu button and hides the desktop menu below the breakpoint', () => {
    const menu = createMenuMarkup();
    const context = createContext();
    const mobileMenu = new MobileMenu(menu, context, {
      classPrefix: 'dropdown-menu',
    });
    window.matchMedia = vi.fn().mockImplementation(() => ({ matches: true }));
    mobileMenu.init();

    expect(mobileMenu.menuButton.style.display).toBe('block');
    expect(menu.style.display).toBe('none');
  });

  it('hides the mobile menu button and shows the desktop menu above the breakpoint', () => {
    const menu = createMenuMarkup();
    const context = createContext();
    const mobileMenu = new MobileMenu(menu, context, {
      classPrefix: 'dropdown-menu',
    });
    window.matchMedia = vi.fn().mockImplementation(() => ({ matches: false }));
    mobileMenu.init();

    expect(mobileMenu.menuButton.style.display).toBe('none');
    expect(menu.style.display).toBe('');
  });
});
