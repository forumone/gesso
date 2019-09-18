import KEYCODE from '../constants/_KEYCODE.es6';

class MobileMenu {
  constructor({
    toggleSubNav = true, // Enable subnav toggle
    navMenu = '.l-navigation .menu--main', // Selector for primary nav
    searchBlock = '', // Selector for search block
    utilityMenu = '', // Selector for utility nav
    header = '.l-header', // Selector for site header
    toggleButton = '.mobile-menu__button', // Selector for Menu toggle
    container = '.mobile-menu-container', // Selector for destination container for mobile nav
    menuLink = '.menu__link', // Selector for individual menu links
    overlayClass = 'mobile-menu', // Overlay class name
    mobileMenuClass = 'mobile-nav', // Class name for navigation section
    mobileSearchClass = 'mobile-search-block', // Class name for search section
    mobileUtilityMenuClass = 'mobile-account-menu', // Class name for utility section
    buttonClass = 'mobile-menu__button', // Class name for all menu buttons
    closeButtonClass = 'mobile-menu__close', // Class name for generated close button
  } = {}) {
    this.options = {
      toggleSubNav,
      menuLink,
      overlayClass,
      mobileMenuClass,
      mobileSearchClass,
      mobileUtilityMenuClass,
      buttonClass,
      closeButtonClass,
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
    this._handleKeyDown = this._handleKeyDown.bind(this);
    this.close = this.close.bind(this);
  }

  _cleanString(string) {
    return string.toLowerCase().replace(' ', '-');
  }

  _processLinks(elem, controlled, index) {
    const thisNode = elem;
    const toggleButton = document.createElement('button');
    const firstLink = [...controlled.querySelectorAll(this.options.menuLink)];

    const elemID = this._cleanString(
      `menu-${elem.innerText}${index ? index : ''}`
    );

    controlled.setAttribute('id', elemID);

    toggleButton.setAttribute('aria-controls', elemID);
    toggleButton.setAttribute('aria-expanded', 'false');
    toggleButton.innerHTML =
      '<span class="visually-hidden">Toggle SubNav</span>';

    toggleButton.addEventListener('click', e => {
      if (toggleButton.getAttribute('aria-expanded') === 'false') {
        e.currentTarget.setAttribute('aria-expanded', 'true');
        controlled.setAttribute('style', 'display: block;');
        firstLink[0].focus();
      } else {
        e.currentTarget.setAttribute('aria-expanded', 'false');
        controlled.setAttribute('style', 'display: none;');
      }
    });

    thisNode.parentNode.insertBefore(toggleButton, controlled);
  }

  _cloneMenu(menu, menuClass = '') {
    let menuClone = null;
    if (menu) {
      menuClone = menu.cloneNode(true);

      menuClone.className = '';
      const subNavClass = this.options.toggleSubNav
        ? 'menu--toggle-subnav'
        : 'menu--show-subnav';

      if (menuClass) {
        menuClone.classList.add(menuClass);
      }
      menuClone.classList.add('menu');
      menuClone.classList.add(subNavClass);

      // Prep subnav menus, if there are any.
      const links = menuClone.querySelectorAll(this.options.menuLink);
      if (links.length) {
        links.forEach((item, index) => {
          const nextElement = item.nextElementSibling;
          item.tabIndex = -1;

          if (
            this.options.toggleSubNav &&
            item.classList.contains('has-subnav') &&
            nextElement &&
            nextElement.tagName === 'UL'
          ) {
            this._processLinks(item, nextElement, index);
          }
        });
      }
    }
    return menuClone;
  }

  _setTabIndex(elem, tabIndex) {
    if (Array.isArray(elem)) {
      elem.forEach(function(item) {
        item.tabIndex = tabIndex;
      });
    } else {
      elem.tabIndex = tabIndex;
    }
  }

  _handleKeyDown(event) {
    // Select all focusable items
    const focusable = this.overlay.querySelectorAll(
      'button, [href], input, select, textarea,[tabindex]:not([tabindex="-1"]'
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

  init() {
    if (!document.body.classList.contains('mobile-menu-processed')) {
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
        '<span class="mobile-menu__icon mobile-menu__icon--close">Close</span>';
      this.closeButton.addEventListener('click', () => this.close());
      this.overlay.appendChild(this.closeButton);

      // Create a menu toggle button if we don't already have one.
      if (this.toggleButton === null) {
        this.toggleButton = document.createElement('button');
        this.toggleButton.classList.add(this.options.buttonClass);
        this.toggleButton.innerHTML =
          '<span class="mobile-menu__icon mobile-menu__icon--menu">Menu</span>';
        this.toggleButton.setAttribute('aria-haspopup', 'menu');
        if (this.header) {
          this.header.insertAdjacentElement('beforeend', this.toggleButton);
        } else {
          document.body.insertAdjacentElement('afterstart', this.toggleButton);
        }
      }
      this.toggleButton.addEventListener('click', () => this.open());

      // Set up the search block
      if (this.searchBlock) {
        this.overlay.appendChild(
          this._cloneMenu(this.searchBlock, this.options.mobileSearchClass)
        );
      }
      // Set up the main nav.
      this.overlay.appendChild(
        this._cloneMenu(this.navMenu, this.options.mobileMenuClass)
      );
      // Set up the utility nav.
      if (this.utilityMenu) {
        this.overlay.appendChild(
          this._cloneMenu(this.utilityMenu, this.options.mobileUtilityMenuClass)
        );
      }

      // Add the overlay to the page.
      if (this.container) {
        this.container.appendChild(this.overlay);
      } else if (this.header) {
        this.header.insertAdjacentElement('afterend', this.overlay);
      } else {
        document.body.insertAdjacentElement('afterbegin', this.overlay);
      }

      this.close();
      document.body.classList.add('mobile-menu-processed');
    }
  }

  open() {
    // Stash the element currently in focus.
    this.prevFocused = document.activeElement;

    this._setTabIndex(this.closeButton, 0);
    this.closeButton.addEventListener('click', this.close);

    const links = [...this.overlay.querySelectorAll('.menu__link')];
    this._setTabIndex(links, 0);

    document.body.classList.add('has-open-mobile-menu');
    this.overlay.setAttribute('style', 'display: block;');

    this.toggleButton.setAttribute('aria-expanded', 'true');

    document.addEventListener('keydown', this._handleKeyDown);
  }

  close() {
    // Remove menu items from the tab flow.
    this._setTabIndex(this.closeButton, -1);
    const links = [...this.overlay.querySelectorAll('.menu__link')];
    this._setTabIndex(links, -1);

    // Remove Event Listeners
    document.removeEventListener('keydown', this._handleKeyDown);
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

export default MobileMenu;
