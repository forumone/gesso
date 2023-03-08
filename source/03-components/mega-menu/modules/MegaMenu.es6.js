/**
 * Megamenu using the W3C Disclosure Menu pattern.
 * @see https://w3c.github.io/aria-practices/examples/disclosure/js/disclosureMenu.js
 */
class MegaMenu {
  /**
   * @constructor
   * @param {HTMLElement} domNode - The menu DOM element
   * @param {boolean} useArrowKeys - Whether to enable navigating by arrow keys
   * @return {void}
   */
  constructor(domNode, { useArrowKeys = true } = {}) {
    this.menu = domNode;
    this.menuSections = [];
    this.openIndex = null;
    this.useArrowKeys = useArrowKeys;
    this.topLevelItems = Array.from(
      this.menu.querySelectorAll('button[aria-expanded][aria-controls]')
    );
    if (this.useArrowKeys) {
      this.topLevelItems = [
        ...this.topLevelItems,
        ...Array.from(this.menu.querySelectorAll('a.js-top-level')),
      ];
    }
    this.handleClickAnywhere = this.handleClickAnywhere.bind(this);
    this.handleKeydownAnywhere = this.handleKeydownAnywhere.bind(this);
  }

  /**
   * Show/hide a section.
   * @param {HTMLElement} section - The menu section to toggle.
   * @param {boolean} hide - If true, the menu section will be hidden
   *  regardless of its current state
   * @return {void}
   */
  toggleSection(section, hide) {
    if (hide) {
      section.hidden = true;
    } else {
      section.hidden = !section.hidden;
    }
    const focusable = section.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]'
    );
    focusable.forEach(focusableItem => {
      focusableItem.tabIndex = section.hidden ? -1 : 0;
    });
    if (!section.hidden) {
      focusable[0].focus();
    }
  }

  /**
   * Expand/collapse a menu section.
   * @param {number} index - The index of the section to toggle.
   * @param {boolean} expanded - If TRUE, the section will be revealed.
   * @return {void}
   */
  toggleExpand(index, expanded) {
    if (this.openIndex !== index) {
      this.toggleExpand(this.openIndex, false);
    }
    if (this.topLevelItems[index]) {
      if (this.openIndex === null) {
        this.openMenu();
      }
      this.openIndex = expanded ? index : null;
      this.topLevelItems[index].setAttribute(
        'aria-expanded',
        expanded ? 'true' : 'false'
      );
      this.toggleSection(this.menuSections[index], !expanded);
      if (this.openIndex === null) {
        this.closeMenu();
      }
    }
  }

  /**
   * Handle navigation key events.
   * @param {KeyboardEvent} event - The keyboard event
   * @param {HTMLElement[]} menuLinks - Array of menu links to navigate through
   * @param {number} currentIndex - Array index of the currently focused menu link
   * @return {void}
   */
  controlFocusByKey(event, menuLinks, currentIndex) {
    switch (event.key) {
      case 'ArrowUp':
      case 'ArrowLeft':
        event.preventDefault();
        if (currentIndex > -1) {
          const prevIndex = Math.max(0, currentIndex - 1);
          menuLinks[prevIndex].focus();
        }
        break;
      case 'ArrowDown':
      case 'ArrowRight':
        event.preventDefault();
        if (currentIndex > -1) {
          const nextIndex = Math.min(menuLinks.length - 1, currentIndex + 1);
          menuLinks[nextIndex].focus();
        }
        break;
      case 'Home':
        event.preventDefault();
        menuLinks[0].focus();
        break;
      case 'End':
        event.preventDefault();
        menuLinks[menuLinks.length - 1].focus();
        break;
      default:
        // Do nothing.
        break;
    }
  }

  /**
   * Handle keydown events on a menu section.
   * @param {KeyboardEvent} event - The keydown event
   * @return {void}
   */
  handleSectionKeydown(event) {
    if (this.openIndex === null || !this.useArrowKeys) return;

    const menuLinks = [
      ...this.menuSections[this.openIndex].querySelectorAll('a, button'),
    ];
    const currentIndex = menuLinks.indexOf(document.activeElement);
    this.controlFocusByKey(event, menuLinks, currentIndex);
  }

  /**
   * Handle clicks on a top-level button.
   * @param {MouseEvent} event - The click event.
   * @return {void}
   */
  handleButtonClick(event) {
    const { currentTarget } = event;
    const buttonIndex = this.topLevelItems.indexOf(currentTarget);
    this.toggleExpand(
      buttonIndex,
      currentTarget.getAttribute('aria-expanded') !== 'true'
    );
  }

  /**
   * Handle keydown events on a top-level button.
   * @param {KeyboardEvent} event - The keydown event
   * @return {void}
   */
  handleButtonKeydown(event) {
    if (!this.useArrowKeys) return;
    const targetButtonIndex = this.topLevelItems.indexOf(
      document.activeElement
    );
    if (this.openIndex === targetButtonIndex && event.key === 'ArrowDown') {
      event.preventDefault();
      this.menuSections[this.openIndex].querySelector('a, button').focus();
    } else {
      this.controlFocusByKey(event, this.topLevelItems, targetButtonIndex);
    }
  }

  /**
   * Handle keydown events on a top-level link.
   * @param {KeyboardEvent} event - The keydown event
   * @return {void}
   */
  handleLinkKeydown(event) {
    if (!this.useArrowKeys) return;
    const targetLinkIndex = this.topLevelItems.indexOf(document.activeElement);
    this.controlFocusByKey(event, this.topLevelItems, targetLinkIndex);
  }

  /**
   * Handle clicks on a close button.
   * @param {MouseEvent} event
   * @return {void}
   */
  handleCloseClick(event) {
    event.preventDefault();
    this.toggleExpand(this.openIndex, false);
  }

  /**
   * Prep a top-level button and menu subsection.
   * @param {HTMLButtonElement} button - The button that will toggle the menu section
   * @return {void}
   */
  prepSection(button) {
    const section = button.parentNode.querySelector('.c-mega-menu__section');
    if (!section) return;
    const closeButton = section.querySelector('.c-mega-menu__section-close');
    this.menuSections.push(section);
    button.setAttribute('aria-expanded', 'false');
    this.toggleSection(section, true);
    section.addEventListener('keydown', this.handleSectionKeydown.bind(this));
    button.addEventListener('click', this.handleButtonClick.bind(this));
    button.addEventListener('keydown', this.handleButtonKeydown.bind(this));
    closeButton.addEventListener('click', this.handleCloseClick.bind(this));
  }

  /**
   * Prep a top-level menu link, which will not have a subsection.
   * @param {HTMLAnchorElement} link - The menu link
   * @return {void}
   */
  prepLink(link) {
    this.menuSections.push(null);
    link.addEventListener('keydown', this.handleLinkKeydown.bind(this));
  }

  /**
   * Close the menu if the user clicks outside it.
   * @param {MouseEvent} event - The click event
   * @return {void}
   */
  handleClickAnywhere(event) {
    if (!event.target.closest('.c-mega-menu')) {
      this.toggleExpand(this.openIndex, false);
      this.closeMenu();
    }
  }

  /**
   * Close the menu if the user hits the ESC key.
   * @param {KeyboardEvent} event - The keydown event
   * @return {void}
   */
  handleKeydownAnywhere(event) {
    if (event.key === 'Escape' && this.openIndex !== null) {
      this.menuSections[this.openIndex].focus();
      this.toggleExpand(this.openIndex, false);
      this.closeMenu();
    } else if (event.key === 'Tab') {
      setTimeout(() => {
        if (document.activeElement.classList.contains('js-top-level')) {
          const openButton = this.menu.querySelector(
            'button[aria-expanded="true"]'
          );
          if (openButton) {
            const buttonIndex = this.topLevelItems.indexOf(openButton);
            this.toggleExpand(buttonIndex, false);
          }
        }
      }, 0);
    }
  }

  /**
   * Remove event listeners when all menu sections closed.
   * @return {void}
   */
  closeMenu() {
    window.removeEventListener('click', this.handleClickAnywhere);
    window.removeEventListener('keydown', this.handleKeydownAnywhere);
  }

  /**
   * Add event listeners when any menu section open.
   * @return {void}
   */
  openMenu() {
    window.addEventListener('click', this.handleClickAnywhere);
    window.addEventListener('keydown', this.handleKeydownAnywhere);
  }

  /**
   * Initialize the mega menu.
   * @return {void}
   */
  init() {
    this.topLevelItems.forEach(item => {
      if (item.tagName === 'BUTTON') {
        this.prepSection(item);
      } else {
        this.prepLink(item);
      }
    });
  }
}

export default MegaMenu;
