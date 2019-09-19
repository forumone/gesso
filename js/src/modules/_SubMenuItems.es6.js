'use strict';

import { SubMenuItem } from './_MenuItem.es6';

export class PopupMenu {
  constructor(domNode, controllerObj) {
    this.domNode = domNode;
    this.controller = controllerObj;
    this.menuitems = [];
    this.firstChars = [];
    this.firstItem = null;
    this.lastItem = null;
    this.hasFocus = false;
    this.hasHover = false;
  }
  init() {
    this.domNode.setAttribute('role', 'menu');

    // Set up any and all submenu items.
    this.domNode.children.forEach(childElement => {
      const menuElement = childElement.firstElementChild;
      if (menuElement && menuElement.tagName === 'A') {
        const menuItem = new SubMenuItem(menuElement, this);
        menuItem.init();
        this.menuitems.push(menuItem);
        const textContent = menuElement.textContent.trim();
        this.firstChars.push(textContent.substring(0, 1).toLowerCase());
      }
    });

    // Stash the first and last items.
    const numItems = this.menuitems.length;
    if (numItems > 0) {
      this.firstItem = this.menuitems[0];
      this.lastItem = this.menuitems[numItems - 1];
    }

    // Add event handlers.
    this.domNode.addEventListener('mouseover', this.handleMouseover.bind(this));
    this.domNode.addEventListener('mouseout', this.handleMouseout.bind(this));
  }
  handleMouseover() {
    this.hasHover = true;
  }
  handleMouseout() {
    this.hasHover = false;
    setTimeout(this.close(this, false), 1);
  }
  setFocusToController(commandParam, flag) {
    let command = commandParam;
    if (typeof command !== 'string') {
      command = '';
    }
    if (command === '') {
      if (this.controller && this.controller.domNode) {
        this.controller.domNode.focus();
      }
      return;
    }
    if (command === 'previous') {
      this.controller.focusOnPreviousSibling();
    } else if (command === 'next') {
      this.controller.focusOnNextSibling();
    }
  }
  setFocusToFirstItem() {
    this.firstItem.focus();
  }
  setFocusToLastItem() {
    this.lastItem.focus();
  }
  setFocusToPreviousItem(currentItem) {
    let index;
    if (currentItem === this.firstItem) {
      this.lastItem.focus();
    } else {
      index = this.menuitems.indexOf(currentItem);
      this.menuitems[index - 1].focus();
    }
  }
  setFocusToNextItem(currentItem) {
    let index;
    if (currentItem === this.lastItem) {
      this.firstItem.domNode.focus();
    } else {
      index = this.menuitems.indexOf(currentItem);
      this.menuitems[index + 1].domNode.focus();
    }
  }
  setFocusByFirstCharacter(currentItem, char) {
    let start;
    let index;
    const lowerChar = char.toLowerCase();
    // Get start index for search based on position of currentItem
    start = this.menuitems.indexOf(currentItem) + 1;
    if (start === this.menuitems.length) {
      start = 0;
    }
    // Check remaining slots in the menu
    index = this.getIndexFirstChars(start, lowerChar);
    // If not found in remaining slots, check from beginning
    if (index === -1) {
      index = this.getIndexFirstChars(0, lowerChar);
    }
    // If match was found...
    if (index > -1) {
      this.menuitems[index].focus();
    }
  }
  getIndexFirstChars(startIndex, char) {
    for (let i = startIndex; i < this.firstChars.length; i++) {
      if (char === this.firstChars[i]) {
        return i;
      }
    }
    return -1;
  }

  open() {
    // Get position and bounding rectangle of controller object's DOM node
    const rect = this.controller.domNode.getBoundingClientRect();
    // Set CSS properties
    if (!this.controller.isMenubarItem) {
      this.domNode.parentNode.style.position = 'relative';
      this.domNode.style.display = 'block';
      this.domNode.style.position = 'absolute';
      this.domNode.style.left = `${rect.width}px`;
      this.domNode.style.zIndex = '100';
    } else {
      this.domNode.style.display = 'block';
      this.domNode.style.position = 'absolute';
      this.domNode.style.top = `${rect.height - 1}px`;
      this.domNode.style.zIndex = '100';
    }
    this.controller.setExpanded(true);
  }

  close(force) {
    let controllerHasHover = this.controller.hasHover;

    let hasFocus = this.hasFocus;

    for (let i = 0; i < this.menuitems.length; i++) {
      const mi = this.menuitems[i];
      if (mi.popupMenu) {
        hasFocus = hasFocus | mi.popupMenu.hasFocus;
      }
    }

    if (!this.controller.isMenubarItem) {
      controllerHasHover = false;
    }

    if (force || (!hasFocus && !this.hasHover && !controllerHasHover)) {
      this.domNode.style.display = 'none';
      this.domNode.style.zIndex = 0;
      this.controller.setExpanded(false);
    }
  }
  _setFocusToMenubarItem(controller, close) {
    // If the controller has a menubar item, focus on it.
    if (controller.isMenubarItem) {
      controller.domNode.focus();
      return controller;
    }
    // Are we closing? If so, close the menu.
    if (close) {
      controller.menu.close(true);
    }
    // If we're not on a menubar item yet, release focus,
    // and check the next level.
    controller.hasFocus = false;
    if (controller.menu.controller) {
      return this._setFocusToMenubarItem(controller.menu.controller, close);
    }
    return false;
  }
  setFocus(state) {
    this.hasFocus = state;
  }
  setHover(state) {
    this.hasHover = state;
  }
}
