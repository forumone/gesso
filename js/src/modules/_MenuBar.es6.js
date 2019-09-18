'use strict';

import MenubarItem from './_MenuBarItem.es6';

class MenuBar {
  constructor(domNode) {
    const msgPrefix = 'Menubar constructor argument menuBarNode';
    if (!(domNode instanceof Element)) {
      throw new TypeError(`${msgPrefix} is not a Dom Element`);
    }
    if (domNode.childElementCount === 0) {
      throw new Error(`${msgPrefix} does not have element children`);
    }
    let e = domNode.firstElementChild;
    while (e) {
      const menuBarItem = e.firstElementChild;
      if (e && menuBarItem && menuBarItem.tagName !== 'A') {
        throw new Error(`${msgPrefix} has child elements are not A elements`);
      }
      e = e.nextElementSibling;
    }
    this.isMenuBar = true;
    this.domNode = domNode;
    this.menubarItems = [];
    this.firstChars = [];
    this.firstItem = null;
    this.lastItem = null;
    this.hasFocus = false;
    this.hasHover = false;
  }
  init() {
    this.domNode.setAttribute('role', 'menubar');
    let elem = this.domNode.firstElementChild;
    while (elem) {
      elem.setAttribute('role', 'none');
      const menuElement = elem.firstElementChild;
      if (elem && menuElement && menuElement.tagName === 'A') {
        const menubarItem = new MenubarItem(menuElement, this);
        menubarItem.init();
        this.menubarItems.push(menubarItem);
        const textContent = menuElement.textContent.trim();
        this.firstChars.push(textContent.substring(0, 1).toLowerCase());
      }
      elem = elem.nextElementSibling;
    }
    const numItems = this.menubarItems.length;
    if (numItems > 0) {
      this.firstItem = this.menubarItems[0];
      this.lastItem = this.menubarItems[numItems - 1];
    }
    this.firstItem.domNode.tabIndex = 0;
  }
  // Focus Management
  setFocusToItem(newItem) {
    let flag = false;
    for (let i = 0; i < this.menubarItems.length; i++) {
      const mbi = this.menubarItems[i];
      if (mbi.domNode.tabIndex === 0) {
        flag = mbi.domNode.getAttribute('aria-expanded') === 'true';
      }
      mbi.domNode.tabIndex = -1;
      if (mbi.popupMenu) {
        mbi.popupMenu.close();
      }
    }
    newItem.domNode.focus();
    newItem.domNode.tabIndex = 0;
    if (flag && newItem.popupMenu) {
      newItem.popupMenu.open();
    }
  }
  setFocusToFirstItem(flag) {
    this.setFocusToItem(this.firstItem);
  }
  setFocusToLastItem(flag) {
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
    let index = this.getIndexFirstChars(start, currChar);
    if (index === -1) {
      index = this.getIndexFirstChars(0, currChar);
    }
    if (index > -1) {
      this.setFocusToItem(this.menubarItems[index]);
    }
  }
  getIndexFirstChars(startIndex, char) {
    for (let i = startIndex; 1 < this.firstChars.length; i++) {
      if (char === this.firstChars[i]) {
        return i;
      }
    }
    return -1;
  }
}

export default MenuBar;
