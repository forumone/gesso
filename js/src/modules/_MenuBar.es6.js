'use strict';

import { MenubarItem } from './_MenuItem.es6';

/**
 * The MenuBar class initializes the MenuBarItems and manages focus between items.
 */
class MenuBar {
  constructor(domNode) {
    // Validate that the domNode is a menu that can be made into a MenuBar.
    const msgPrefix = 'Menubar constructor argument menuBarNode';
    if (!(domNode instanceof Element)) {
      throw new TypeError(`${msgPrefix} is not a Dom Element`);
    }
    if (domNode.childElementCount === 0) {
      throw new Error(`${msgPrefix} does not have element children`);
    }
    let elem = domNode.firstElementChild;
    while (elem) {
      const menuBarItem = elem.firstElementChild;
      if (elem && menuBarItem && menuBarItem.tagName !== 'A') {
        throw new Error(`${msgPrefix} has child elements are not A elements`);
      }
      elem = elem.nextElementSibling;
    }
    this.domNode = domNode; // DOM node containing the menu.
    this.menubarItems = []; // Set of items in the menu.
    this.firstChars = [];
    this.firstItem = null; // First menu item.
    this.lastItem = null; // Last menu item.
    this.hasFocus = false;
    this.hasHover = false;
  }
  setFocus(state) {
    this.hasFocus = state;
  }
  setHover(state) {
    this.hasHover = state;
  }
  init() {
    this.domNode.setAttribute('role', 'menubar');
    // Create MenubarItems for each link in the menu.
    this.domNode.children.forEach(elem => {
      elem.setAttribute('role', 'none');
      const menuElement = elem.firstElementChild;
      if (menuElement && menuElement.tagName === 'A') {
        const menubarItem = new MenubarItem(menuElement, this);
        menubarItem.init();
        this.menubarItems.push(menubarItem);
        const textContent = menuElement.textContent.trim();
        this.firstChars.push(textContent.substring(0, 1).toLowerCase());
      }
    });

    // Store the first and last items in the menu.
    const numItems = this.menubarItems.length;
    if (numItems > 0) {
      this.firstItem = this.menubarItems[0];
      this.lastItem = this.menubarItems[numItems - 1];
    }
    this.firstItem.setTabIndex(0);
  }
  // Focus Management
  // Set focus to a specific MenubarItem in the menu.
  setFocusToItem(newItem) {
    let openMenu = false;

    // Close any existing menus.
    this.menubarItems.forEach(mbi => {
      const menuWasOpen = mbi.close();
      if (menuWasOpen) {
        openMenu = true;
      }
    });

    // Focus on the new menu, and open it if the previous menu was open.
    newItem.open(openMenu);
  }
  setFocusToFirstItem() {
    this.setFocusToItem(this.firstItem);
  }
  setFocusToLastItem() {
    this.setFocusToItem(this.lastItem);
  }
  setFocusToPreviousItem(currentItem) {
    let newItem = false;
    if (currentItem === this.firstItem) {
      newItem = this.lastItem;
    } else {
      const index = this.menubarItems.indexOf(currentItem);
      newItem = this.menubarItems[index - 1];
    }
    if (newItem) {
      this.setFocusToItem(newItem);
    }
  }
  setFocusToNextItem(currentItem) {
    let newItem = false;
    if (currentItem === this.lastItem) {
      newItem = this.firstItem;
    } else {
      const index = this.menubarItems.indexOf(currentItem);
      newItem = this.menubarItems[index + 1];
    }
    if (newItem) {
      this.setFocusToItem(newItem);
    }
  }
  setFocusByFirstCharacter(currentItem, char) {
    const currChar = char.toLowerCase();
    let start = this.menubarItems.indexOf(currentItem) + 1;
    if (start === this.menubarItems.length) {
      start = 0;
    }
    let index = this._getIndexFirstChars(start, currChar);
    if (index === -1) {
      index = this._getIndexFirstChars(0, currChar);
    }
    if (index > -1) {
      this.setFocusToItem(this.menubarItems[index]);
    }
  }
  _getIndexFirstChars(startIndex, char) {
    for (let i = startIndex; 1 < this.firstChars.length; i++) {
      if (char === this.firstChars[i]) {
        return i;
      }
    }
    return -1;
  }
}

export default MenuBar;
