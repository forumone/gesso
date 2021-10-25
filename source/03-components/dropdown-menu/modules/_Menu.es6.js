/**
 * @abstract
 */
class Menu {
  constructor(domNode) {
    this.domNode = domNode; // DOM node containing the menu.
    this.menuItems = []; // Set of items in the menu.
    this.firstChars = []; // Set of first characters.
    this.firstItem = null; // First menu item.
    this.lastItem = null; // Last menu item.
    this.hasFocus = false; // Whether menu has keyboard focus.
    this.hasHover = false; // Whether menu has hover.
    this.isMenubar = false; // Whether this is a menubar.
  }

  // Allow an empty function here because this is an abstract class.
  // eslint-disable-next-line
  createMenuItem(menuElement) {}

  isValidTag(tagName) {
    return tagName === 'A' || tagName === 'BUTTON';
  }

  init() {
    // Set up any and all submenu items.
    if (this.domNode.children.length > 0) {
      const nodesArray = [...this.domNode.children];
      nodesArray.forEach(childElement => {
        const menuElement = childElement.firstElementChild;
        if (menuElement && this.isValidTag(menuElement.tagName)) {
          const menuItem = this.createMenuItem(menuElement);
          menuItem.init();
          this.menuItems.push(menuItem);
          const textContent = menuElement.textContent.trim();
          this.firstChars.push(textContent.substring(0, 1).toLowerCase());
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

  setFocus(state) {
    this.hasFocus = state;
  }

  setHover(state) {
    this.hasHover = state;
  }

  // Allow an empty function here because this is an abstract class.
  // eslint-disable-next-line
  setFocusToItem(newItem) {}

  setFocusToFirstItem() {
    this.setFocusToItem(this.firstItem);
  }

  setFocusToLastItem() {
    this.setFocusToItem(this.lastItem);
  }

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

  setFocusByFirstCharacter(currentItem, char) {
    const currChar = char.toLowerCase();
    let start = this.menuItems.indexOf(currentItem) + 1;
    if (start === this.menuItems.length) {
      start = 0;
    }
    let index = this.getIndexFirstChars(start, currChar);
    if (index === -1) {
      index = this.getIndexFirstChars(0, currChar);
    }
    if (index > -1) {
      this.setFocusToItem(this.menuItems[index]);
    }
  }

  getIndexFirstChars(startIndex, char) {
    for (let i = startIndex; this.firstChars.length > 1; i += 1) {
      if (char === this.firstChars[i]) {
        return i;
      }
    }
    return -1;
  }
}

export default Menu;
