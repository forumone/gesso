class OverlayMenu {
  /**
   * @constructor
   * @param {HTMLElement} domNode - The top-level menu node
   * @param {HTMLElement|null} menuButton - The menu toggle
   */
  constructor(domNode, { menuButton = null } = {}) {
    this.overlay = domNode;
    this.menuButton = menuButton;
    this.handleKeydown = this.handleKeydown.bind(this);
  }

  /**
   * Create a menu toggle button.
   * @return {HTMLElement}
   */
  createMenuButton() {
    const menuButton = document.createElement('button');
    menuButton.classList.add('hamburger-button', 'hamburger-button--menu');
    menuButton.setAttribute('aria-controls', this.overlay.id);
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.innerHTML = '<span class="hamburger-button__icon">Menu</span>';
    return this.overlay.insertAdjacentElement('beforebegin', menuButton);
  }

  /**
   * Close the overlay.
   * @return void
   */
  closeMenu() {
    this.menuButton.classList.remove('hamburger-button--close');
    this.menuButton.classList.add('hamburger-button--menu');
    this.menuButton.innerHTML =
      '<span class="hamburger-button__icon">Close</span>';
    this.menuButton.setAttribute('aria-expanded', 'false');
    this.overlay.classList.remove('is-open');
    window.removeEventListener('keydown', this.handleKeydown);
    this.disableTab();
  }

  /**
   * Open the overlay.
   * @return void
   */
  openMenu() {
    this.menuButton.classList.remove('hamburger-button--menu');
    this.menuButton.classList.add('hamburger-button--close');
    this.menuButton.innerHTML =
      '<span class="hamburger-button__icon">Menu</span>';
    this.menuButton.setAttribute('aria-expanded', 'true');
    this.overlay.classList.add('is-open');
    window.addEventListener('keydown', this.handleKeydown);
    this.enableTab();
  }

  /**
   * Close the menu if open and vice-versa.
   * @return void
   */
  toggleMenu() {
    if (this.menuButton.getAttribute('aria-expanded') !== 'true') {
      this.openMenu();
    } else {
      this.closeMenu();
    }
  }

  /**
   * Handle clicks on menu button toggle.
   * @param {MouseEvent<HTMLButtonElement>} event - The click event.
   * @return void
   */
  handleButtonClick(event) {
    event.preventDefault();
    this.toggleMenu();
  }

  /**
   * Trap the tab within a group of focusable elements
   * @param {KeyboardEvent} event - The keyboard event
   * @param {NodeList} focusable - The set of focusable element.
   * @return void
   */
  trapTab(event, focusable) {
    const numberFocusElements = focusable.length;
    const firstFocusableElement = focusable[0];
    const lastFocusableElement = focusable[numberFocusElements - 1];
    if (event.key === 'Tab') {
      if (event.shiftKey && document.activeElement === firstFocusableElement) {
        event.preventDefault();
        lastFocusableElement.focus();
      } else if (document.activeElement === lastFocusableElement) {
        event.preventDefault();
        firstFocusableElement.focus();
      }
    }
  }

  /**
   * Handle keydown events.
   * @param {KeyboardEvent} event - The keydown event
   * @return void
   */
  handleKeydown(event) {
    if (event.key === 'Escape') {
      this.closeMenu();
    }
    // Keep the user from tabbing out of the menu.
    const focusable = this.overlay.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    this.trapTab(event, focusable);
  }

  /**
   * Disable tab on all menu links. This is to ensure hidden items
   * do not still receive tab focus.
   */
  disableTab() {
    const menuLinks = this.overlay.querySelectorAll('.menu__link');
    menuLinks.forEach(link => {
      link.tabIndex = -1;
    });
  }

  /**
   * Enable tabbing on all menu links.
   */
  enableTab() {
    const menuLinks = this.overlay.querySelectorAll('.menu__link');
    menuLinks.forEach(link => {
      link.tabIndex = 0;
    });
  }

  /**
   * Initialize the overlay menu.
   * @return void
   */
  init() {
    if (!this.menuButton) {
      this.menuButton = this.createMenuButton();
    }
    this.menuButton.addEventListener(
      'click',
      this.handleButtonClick.bind(this)
    );
    this.disableTab();
  }
}

export default OverlayMenu;
