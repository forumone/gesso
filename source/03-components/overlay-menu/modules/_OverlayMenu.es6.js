class OverlayMenu {
  /**
   * @constructor
   * @param {HTMLElement} domNode - The top-level menu node
   * @param {HTMLElement|null} menuButton - The open menu button
   * @param {HTMLElement|null} closeButton - The close button toggle
   */
  constructor(domNode, { menuButton = null, closeButton = null } = {}) {
    this.overlay = domNode;
    this.menuButton = menuButton;
    this.closeButton = closeButton;
    this.handleKeydown = this.handleKeydown.bind(this);
  }

  /**
   * Create a menu toggle button.
   * @return {HTMLElement}
   */
  createMenuButton() {
    const menuButton = document.createElement('button');
    menuButton.classList.add('c-hamburger-button', 'c-hamburger-button--menu');
    menuButton.setAttribute('aria-controls', this.overlay.id);
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.innerHTML = '<span class="c-hamburger-button__icon">Menu</span>';
    return this.overlay.insertAdjacentElement('beforebegin', menuButton);
  }

  createCloseButton() {
    const menuButton = document.createElement('button');
    menuButton.classList.add('c-hamburger-button', 'c-hamburger-button--close');
    menuButton.setAttribute('aria-controls', this.overlay.id);
    menuButton.setAttribute('aria-expanded', 'true');
    menuButton.innerHTML = '<span class="c-hamburger-button__icon">Close</span>';
    menuButton.hidden = true;
    return this.overlay.insertAdjacentElement('afterbegin', menuButton);
  }

  /**
   * Close the overlay.
   * @return void
   */
  closeMenu() {
    this.menuButton.hidden = false;
    this.menuButton.setAttribute('aria-expanded', 'false');
    this.closeButton.hidden = true;
    this.closeButton.setAttribute('aria-expanded', 'false');
    this.overlay.classList.remove('is-open');
    document.body.classList.remove('has-open-menu');
    window.removeEventListener('keydown', this.handleKeydown);
    this.disableTab(this.overlay);
  }

  /**
   * Open the overlay.
   * @return void
   */
  openMenu() {
    this.menuButton.hidden = true;
    this.menuButton.setAttribute('aria-expanded', 'true');
    this.closeButton.hidden = false;
    this.closeButton.setAttribute('aria-expanded', 'true');
    this.overlay.classList.add('is-open');
    document.body.classList.add('has-open-menu');
    window.addEventListener('keydown', this.handleKeydown);
    this.enableTab(this.overlay);
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
   * Handle keydown events.
   * @param {KeyboardEvent} event - The keydown event
   * @return void
   */
  handleKeydown(event) {
    if (event.key === 'Escape') {
      this.closeMenu();
    }
    // Keep the user from tabbing out of the menu.
    const focusable = Array.from(
      this.overlay.querySelectorAll('button, [href], input, select, textarea')
    ).filter(item => item.tabIndex !== -1);
    const numberFocusElements = focusable.length;
    const firstFocusableElement = focusable[0];
    const lastFocusableElement = focusable[numberFocusElements - 1];
    if (event.key === 'Tab') {
      if (event.shiftKey && document.activeElement === firstFocusableElement) {
        event.preventDefault();
        lastFocusableElement.focus();
      } else if (
        document.activeElement === lastFocusableElement &&
        !event.shiftKey
      ) {
        event.preventDefault();
        firstFocusableElement.focus();
      }
    }
  }

  /**
   * Disable tab on all menu links. This is to ensure hidden items
   * do not still receive tab focus.
   */
  disableTab(startingPoint) {
    const menuLinks = startingPoint.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]'
    );
    menuLinks.forEach(link => {
      link.setAttribute('tabindex', '-1');
    });
  }

  /**
   * Enable tabbing on all menu links.
   */
  enableTab(startingPoint) {
    const menuLinks = Array.from(
      startingPoint.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]'
      )
    ).filter(elem => window.getComputedStyle(elem).display !== 'none');
    menuLinks.forEach(link => {
      link.setAttribute('tabindex', '0');
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
    if (!this.closeButton) {
      this.closeButton = this.createCloseButton();
    }
    this.closeButton.addEventListener(
      'click',
      this.handleButtonClick.bind(this)
    );
    this.disableTab(this.overlay);
  }
}

export default OverlayMenu;
