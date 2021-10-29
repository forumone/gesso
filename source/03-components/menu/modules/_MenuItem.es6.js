/**
 * @abstract
 */
class MenuItem {
  /**
   * @constructor
   * @param {HTMLElement} domNode - The menu DOM element.
   * @param {Menu} menuObj - The Menu to which this menu item belongs.
   */
  constructor(domNode, menuObj) {
    this.menu = menuObj;
    this.domNode = domNode;
    this.popupMenu = false;
    this.isMenubarItem = false;
    this.hasFocus = false;
    this.hasHover = false;
    this.handleKeydown = this.handleKeydown.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.handleMouseover = this.handleMouseover.bind(this);
    this.handleMouseout = this.handleMouseout.bind(this);
  }

  /**
   * Initialize the menu item.
   * @return {void}
   */
  init() {
    this.domNode.addEventListener('keydown', this.handleKeydown);
    this.domNode.addEventListener('focus', this.handleFocus);
    this.domNode.addEventListener('blur', this.handleBlur);
    this.domNode.addEventListener('mouseover', this.handleMouseover);
    this.domNode.addEventListener('mouseout', this.handleMouseout);
  }

  destroy() {
    this.domNode.removeEventListener('keydown', this.handleKeydown);
    this.domNode.removeEventListener('focus', this.handleFocus);
    this.domNode.removeEventListener('blur', this.handleBlur);
    this.domNode.removeEventListener('mouseover', this.handleMouseover);
    this.domNode.removeEventListener('mouseout', this.handleMouseout);
  }

  /**
   * Set whether the menu item's submenu is expanded.
   * @param {boolean} value - TRUE if submenu is expanded
   */
  setExpanded(value) {
    if (value) {
      this.domNode.setAttribute('aria-expanded', 'true');
    } else {
      this.domNode.setAttribute('aria-expanded', 'false');
    }
  }

  /**
   * Get the boundaries of the menu item.
   * @return {DOMRect}
   */
  getBoundaries() {
    return this.domNode.getBoundingClientRect();
  }

  /**
   * Get whether or not this is a top-level menu item on the menu bar.
   * @return {boolean}
   */
  getIsMenubarItem() {
    return this.isMenubarItem;
  }

  /**
   * Get whether the user is currently hovering over the menu item.
   * @return {boolean}
   */
  getHover() {
    return this.hasHover;
  }

  /**
   * Set the menu as focused when the menu item has keyboard focus.
   * @return {void}
   */
  handleFocus() {
    this.menu.setFocus(true);
  }

  /**
   * Unset the menu has focused when the menu item no longer has keyboard focus.
   * @return {void}
   */
  handleBlur() {
    this.menu.setFocus(false);
  }

  /**
   * Handle mousing over the menu item.
   * @return {void}
   */
  handleMouseover() {
    this.hasHover = true;
    // Show the submenu if the outer menu is configured to display menus on hover.
    if (this.popupMenu && this.menu.options.displayMenuOnHover) {
      this.popupMenu.setHover(true);
      this.popupMenu.open();
    }
  }

  /**
   * Handle mousing off of the menu item.
   * @return {void}
   */
  handleMouseout() {
    this.hasHover = false;
    if (this.popupMenu && this.menu.options.displayMenuOnHover) {
      // Hide the submenu if the outer menu is configured to display menus on hover.
      this.popupMenu.setHover(false);
      setTimeout(this.popupMenu.close.bind(this.popupMenu, false), 300);
    }
  }

  /**
   * Handle a keydown event on the menu item.
   * @param {KeyboardEvent} event - The keydown event.
   * @return {void}
   */
  // Allow an empty function here because this is an abstract class.
  // eslint-disable-next-line
  handleKeydown(event) {}

  /**
   * Set keyboard focus to the menu item.
   * @return {void}
   */
  focusOnSelf() {
    this.domNode.focus();
  }

  /**
   * Set keyboard focus to the previous menu item.
   * @return {void}
   */
  focusOnPreviousSibling() {
    this.menu.setFocusToPreviousItem(this);
  }

  /**
   * Set keyboard focus to the next menu item.
   * @return {void}
   */
  focusOnNextSibling() {
    this.menu.setFocusToNextItem(this);
  }
}

export default MenuItem;
