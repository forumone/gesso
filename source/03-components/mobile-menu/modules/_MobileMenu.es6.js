import KEYCODE from '../../../00-config/_KEYCODE.es6';
import { BREAKPOINTS } from '../../../00-config/_GESSO.es6';

class _MobileMenu {
  constructor({
    toggleSubNav = true, // Enable subnav toggle
    navMenu = '.menu--main', // Selector for primary menu to clone for mobile menu
    searchBlock = '', // Selector for search block
    utilityMenu = '', // Selector for utility menu to add to mobile menu
    header = '.l-header', // Selector for site header
    toggleButton = '.hamburger-button--menu', // Selector for Menu toggle
    container = '.mobile-menu-container', // Selector for destination container for mobile nav
    menuItem = '.menu__item', // Selector for individual menu items
    menuItemClass = 'mobile-menu__item', // Class name to add to individual menu items
    menuLink = '.menu__link', // Selector for individual menu links
    menuLinkClass = 'mobile-menu__link', // Class name to add to individual menu links
    menuSubMenu = '.menu__subnav', // Selector for submenus
    menuSubMenuClass = 'mobile-menu__subnav', // Class name to add to submenus
    overlayClass = 'mobile-menu', // Overlay class name
    mobileMenuClass = 'mobile-menu__menu', // Class name for main navigation section
    mobileSearchClass = 'mobile-menu__search', // Class name for search section
    mobileUtilityMenuClass = 'mobile-menu__menu', // Class name for utility section
    buttonClass = 'hamburger-button', // Class name for all menu buttons
    menuButtonClass = 'hamburger-button--menu', // Class name for generated menu button
    closeButtonClass = 'hamburger-button--close', // Class name for generated close button
    arrowButtonClass = 'mobile-menu__subnav-arrow', // Class name for the subnav toggle
    mobileMenuBreakpoint = `(max-width: ${BREAKPOINTS['mobile-menu']})`, // Breakpoint to switch between mobile + original menu
  } = {}) {
    this.options = {
      toggleSubNav,
      menuItem,
      menuItemClass,
      menuLink,
      menuLinkClass,
      menuSubMenu,
      menuSubMenuClass,
      overlayClass,
      mobileMenuClass,
      mobileSearchClass,
      mobileUtilityMenuClass,
      buttonClass,
      menuButtonClass,
      closeButtonClass,
      arrowButtonClass,
      mobileMenuBreakpoint,
    };
    this.navMenu = navMenu ? document.querySelector(navMenu) : null;
    this.searchBlock = searchBlock ? document.querySelector(searchBlock) : null;
    this.utilityMenu = utilityMenu ? document.querySelector(utilityMenu) : null;
    this.header = header ? document.querySelector(header) : null;
    this.toggleButton = toggleButton
      ? document.querySelector(toggleButton)
      : null;
    this.container = container ? document.querySelector(container) : null;
    this.prevFocused = null;
    // Necessary so removeEventListener will work properly.
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.toggleMenuDisplay = this.toggleMenuDisplay.bind(this);
    this.close = this.close.bind(this);
  }

  cleanString(stringToClean) {
    return stringToClean.toLowerCase().replace(' ', '-');
  }

  processLinks(elem, controlled, index) {
    const thisNode = elem;
    const toggleButton = document.createElement('button');
    const firstLink = [...controlled.querySelectorAll(this.options.menuLink)];

    const elemID = this.cleanString(
      `mobile-menu-${elem.innerText}${index || ''}`
    );

    controlled.setAttribute('id', elemID);

    toggleButton.classList.add(this.options.arrowButtonClass);
    toggleButton.setAttribute('aria-controls', elemID);
    toggleButton.setAttribute('aria-expanded', 'false');
    toggleButton.innerHTML =
      '<span class="visually-hidden">Toggle SubNav</span>';

    toggleButton.addEventListener('click', e => {
      if (toggleButton.getAttribute('aria-expanded') === 'false') {
        e.currentTarget.setAttribute('aria-expanded', 'true');
        controlled.setAttribute('style', 'display: block;');
        firstLink[0][0].focus();
      } else {
        e.currentTarget.setAttribute('aria-expanded', 'false');
        controlled.setAttribute('style', 'display: none;');
      }
    });

    thisNode.parentNode.insertBefore(toggleButton, controlled);
  }

  cloneBlock(block, blockClass = '') {
    let blockClone = null;
    if (block) {
      blockClone = block.cloneNode(true);
      if (blockClass) {
        blockClone.classList.add(blockClass);
      }
    }
    return blockClone;
  }

  cloneMenu(menu, menuClass = '') {
    let menuClone = null;
    if (menu) {
      menuClone = menu.cloneNode(true);

      menuClone.className = '';
      const subNavClass = this.options.toggleSubNav
        ? 'mobile-menu__menu--toggle-subnav'
        : 'mobile-menu__menu--show-subnav';

      if (menuClass) {
        menuClone.classList.add(menuClass);
      }
      menuClone.classList.add(subNavClass);

      const items = menuClone.querySelectorAll(this.options.menuItem);
      if (items.length) {
        items.forEach(item => {
          item.classList.add(this.options.menuItemClass);
          item.classList.remove('menu__item');
        });
      }

      const menus = menuClone.querySelectorAll(this.options.menuSubMenu);
      if (menus.length) {
        menus.forEach(item => {
          item.classList.add(this.options.menuSubMenuClass);
          item.classList.remove('menu');
          item.classList.remove('menu__subnav');
        });
      }

      // Prep subnav menus, if there are any.
      const links = menuClone.querySelectorAll(this.options.menuLink);
      if (links.length) {
        links.forEach((item, index) => {
          const link = item;
          const nextElement = item.nextElementSibling;
          link.tabIndex = -1;

          if (
            this.options.toggleSubNav &&
            link.classList.contains('has-subnav') &&
            nextElement &&
            nextElement.tagName === 'UL'
          ) {
            this.processLinks(link, nextElement, index);
          }
          link.classList.add(this.options.menuLinkClass);
          link.classList.remove('menu__link');
        });
      }
    }
    return menuClone;
  }

  setTabIndex(elem, tabIndex) {
    if (Array.isArray(elem)) {
      elem.forEach(item => {
        // Check if item is a NodeList.
        if (Object.prototype.isPrototypeOf.call(NodeList.prototype, item)) {
          for (let i = 0; i < item.length; i += 1) {
            item[i].tabIndex = tabIndex;
          }
        } else {
          item.tabIndex = tabIndex;
        }
      });
    } else {
      elem.tabIndex = tabIndex;
    }
  }

  handleKeyDown(event) {
    // Select all focusable items
    const focusable = this.overlay.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );

    const numberFocusElements = focusable.length;
    const firstFocusableElement = focusable[0];
    const lastFocusableElement = focusable[numberFocusElements - 1];

    // Close modal
    if (event.keyCode === KEYCODE.ESC) {
      this.close();
    }

    // Trap Tab
    if (event.keyCode === KEYCODE.TAB && event.shiftKey) {
      if (document.activeElement === firstFocusableElement) {
        event.preventDefault();
        lastFocusableElement.focus();
      }
    } else if (event.keyCode === KEYCODE.TAB) {
      if (document.activeElement === lastFocusableElement) {
        event.preventDefault();
        firstFocusableElement.focus();
      }
    }
  }

  toggleMenuDisplay() {
    // Hide the original or cloned content, depending on screen size.
    if (window.matchMedia(this.options.mobileMenuBreakpoint).matches) {
      this.overlay.style.display = '';
      this.toggleButton.style.display = '';
      if (this.searchBlock) {
        this.searchBlock.style.display = 'none';
      }
      if (this.navMenu) {
        this.navMenu.style.display = 'none';
      }
      if (this.utilityMenu) {
        this.utilityMenu.style.display = 'none';
      }
      this.close();
    } else {
      this.overlay.style.display = 'none';
      this.toggleButton.style.display = 'none';
      if (this.searchBlock) {
        this.searchBlock.style.display = '';
      }
      if (this.navMenu) {
        this.navMenu.style.display = '';
      }
      if (this.utilityMenu) {
        this.utilityMenu.style.display = '';
      }
    }
  }

  init() {
    // Set up the overlay.
    this.overlay = document.createElement('nav');
    this.overlay.classList.add(this.options.overlayClass);
    this.overlay.setAttribute('aria-role', 'menu');
    this.overlay.setAttribute('aria-modal', 'true');

    // Create and set up the close button.
    // Multiple calls to classList.add() here because IE doesn't support multiple arguments. :(
    this.closeButton = document.createElement('button');
    this.closeButton.classList.add(this.options.buttonClass);
    this.closeButton.classList.add(this.options.closeButtonClass);
    this.closeButton.innerHTML =
      '<span class="hamburger-button__icon">Close</span>';
    this.closeButton.addEventListener('click', () => this.close());
    this.overlay.appendChild(this.closeButton);

    // Create a menu toggle button if we don't already have one.
    if (this.toggleButton === null) {
      this.toggleButton = document.createElement('button');
      this.toggleButton.classList.add(this.options.buttonClass);
      this.toggleButton.classList.add(this.options.menuButtonClass);
      this.toggleButton.innerHTML =
        '<span class="hamburger-button__icon">Menu</span>';
      this.toggleButton.setAttribute('aria-haspopup', 'menu');
      if (this.header) {
        this.header.insertAdjacentElement('beforeEnd', this.toggleButton);
      } else {
        document.body.insertAdjacentElement('afterBegin', this.toggleButton);
      }
    }
    this.toggleButton.addEventListener('click', () => this.open());

    // Set up the search block
    if (this.searchBlock) {
      this.overlay.appendChild(
        this.cloneBlock(this.searchBlock, this.options.mobileSearchClass)
      );
    }

    // Set up the main nav.
    if (this.navMenu) {
      this.overlay.appendChild(
        this.cloneMenu(this.navMenu, this.options.mobileMenuClass)
      );
    }
    // Set up the utility nav.
    if (this.utilityMenu) {
      this.overlay.appendChild(
        this.cloneMenu(this.utilityMenu, this.options.mobileUtilityMenuClass)
      );
    }

    // Add the overlay to the page.
    if (this.container) {
      this.container.appendChild(this.overlay);
    } else if (this.header) {
      this.header.insertAdjacentElement('afterEnd', this.overlay);
    } else {
      document.body.insertAdjacentElement('afterBegin', this.overlay);
    }

    this.toggleMenuDisplay();
    this.close();

    let resizeTimeout = false;
    let lastWindowWidth = window.innerWidth;
    window.addEventListener('resize', () => {
      const currWindowWidth = window.innerWidth;

      if (lastWindowWidth !== currWindowWidth) {
        if (resizeTimeout !== false) {
          clearTimeout(resizeTimeout);
        }

        resizeTimeout = setTimeout(this.toggleMenuDisplay, 200);
        lastWindowWidth = currWindowWidth;
      }
    });
  }

  open() {
    // Stash the element currently in focus.
    this.prevFocused = document.activeElement;

    this.setTabIndex(this.closeButton, 0);
    this.closeButton.addEventListener('click', this.close);

    const links = [...this.overlay.querySelectorAll('.mobile-menu__link')];
    this.setTabIndex(links, 0);

    document.body.classList.add('has-open-mobile-menu');
    this.overlay.setAttribute('style', 'display: block;');

    this.toggleButton.setAttribute('aria-expanded', 'true');

    document.addEventListener('keydown', this.handleKeyDown);
  }

  close() {
    // Remove menu items from the tab flow.
    this.setTabIndex(this.closeButton, -1);
    const links = [...this.overlay.querySelectorAll('.mobile-menu__link')];
    this.setTabIndex(links, -1);

    // Remove Event Listeners
    document.removeEventListener('keydown', this.handleKeyDown);
    this.closeButton.removeEventListener('click', this.close);

    document.body.classList.remove('has-open-mobile-menu');
    this.overlay.setAttribute('style', 'display: none;');

    this.toggleButton.removeAttribute('aria-expanded');

    // Restore focus to the original item.
    if (this.prevFocused) {
      this.prevFocused.focus();
    }
  }
}

export default _MobileMenu;
