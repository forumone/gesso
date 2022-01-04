/**
 * @abstract
 */
class Menu {
  /**
   * @constructor
   * @param {HTMLElement} domNode - The outer menu element.
   * @param {boolean} useArrowKeys - Whether to enable navigation by arrow keys.
   * @param {boolean} displayMenuOnHover - Whether to show submenus when parent link is hovered over
   * @param {string} submenuSelector - CSS selector to identify submenus.
   */
  constructor(
    domNode,
    {
      useArrowKeys = true,
      displayMenuOnHover = true,
      submenuSelector = '.c-dropdown-menu__subnav',
    } = {}
  ) {
    this.domNode = domNode; // DOM node containing the menu.
    this.menuItems = []; // Set of items in the menu.
    this.firstItem = null; // First menu item.
    this.lastItem = null; // Last menu item.
    this.hasFocus = false; // Whether menu has keyboard focus.
    this.hasHover = false; // Whether menu has hover.
    this.isMenubar = false; // Whether this is a menubar.

    this.options = {
      useArrowKeys,
      displayMenuOnHover,
      submenuSelector,
    };
  }

  /**
   * Create the appropriate MenuItem type from a menu element.
   * @param {HTMLElement} menuElement - The menu element.
   * @return {MenuItem}
   */
  // Allow an empty function here because this is an abstract class.
  // eslint-disable-next-line
  createMenuItem(menuElement) {}

  /**
   * Whether a given tag name is a valid tag for menu links.
   * @param {string} tagName - The tag name to check.
   * @return {boolean}
   */
  isValidTag(tagName) {
    return tagName === 'A' || tagName === 'BUTTON';
  }

  /**
   * Initialize the menu.
   * @return {void}
   */
  init() {
    // Set up any and all submenu items.
    if (this.domNode.children.length > 0) {
      const nodesArray = Array.from(this.domNode.children);
      nodesArray.forEach(childElement => {
        const menuElement = childElement.firstElementChild;
        if (menuElement && this.isValidTag(menuElement.tagName)) {
          const menuItem = this.createMenuItem(menuElement);
          menuItem.init();
          this.menuItems.push(menuItem);
          if (menuElement.tagName === 'BUTTON') {
            this.options.displayMenuOnHover = false;
          }
        }
      });
    }

    // Store the first and last items in the menu.
    const numItems = this.menuItems.length;
    if (numItems > 0) {
      [this.firstItem] = this.menuItems;
      this.lastItem = this.menuItems[numItems - 1];
    }
  }

  /**
   * Destroy the menu.
   * @return {void}
   */
  destroy() {
    this.menuItems.forEach(item => {
      item.destroy();
    });
  }

  /**
   * Set the keyboard focus state.
   * @param {boolean} state - TRUE if menu has keyboard focus.
   * @return {void}
   */
  setFocus(state) {
    this.hasFocus = state;
  }

  /**
   * Set the hover state.
   * @param {boolean} state - TRUE if mouse cursor is over the menu.
   * @return {void}
   */
  setHover(state) {
    this.hasHover = state;
  }

  /**
   * Set focus to a specific menu item.
   * @param {MenuItem} newItem - The new menu item to focus on.
   */
  setFocusToItem(newItem) {
    newItem.domNode.focus();
  }

  /**
   * Set keyboard focus to the first item in the menu.
   * @return {void}
   */
  setFocusToFirstItem() {
    this.setFocusToItem(this.firstItem);
  }

  /**
   * Set keyboard focus to the last item in the menu.
   * @return {void}
   */
  setFocusToLastItem() {
    this.setFocusToItem(this.lastItem);
  }

  /**
   * Set keyboard focus to the previous item in the menu.
   * @param {MenuItem} currentItem - The currently focused menu item.
   * @return {void}
   */
  setFocusToPreviousItem(currentItem) {
    let newItem;
    if (currentItem === this.firstItem) {
      newItem = this.lastItem;
    } else {
      const index = this.menuItems.indexOf(currentItem);
      newItem = this.menuItems[index - 1];
    }
    if (newItem) {
      this.setFocusToItem(newItem);
    }
  }

  /**
   * Set keyboard focus to the next item in the menu.
   * @param {MenuItem} currentItem - The currently focused menu item.
   * @return {void}
   */
  setFocusToNextItem(currentItem) {
    let newItem;
    if (currentItem === this.lastItem) {
      newItem = this.firstItem;
    } else {
      const index = this.menuItems.indexOf(currentItem);
      newItem = this.menuItems[index + 1];
    }
    if (newItem) {
      this.setFocusToItem(newItem);
    }
  }
}

export default Menu;
