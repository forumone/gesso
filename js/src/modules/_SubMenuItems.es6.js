'use strict';

import KEYCODE from '../constants/_KEYCODE.es6';

export class PopupMenu {
  constructor(domNode, controllerObj) {
    this.isMenubar = false;
    this.domNode = domNode;
    this.controller = controllerObj;
    this.menuitems = [];
    this.firstChars = [];
    this.firstItem = null;
    this.lastItem = null;
    this.hasFocus = false; // See MenuItem handleFocus, handleBlur
    this.hasHover = false; // See PopupMenu handleMouseover, handleMouseout
    this.domNode.addEventListener('mouseover', this.handleMouseover.bind(this));
    this.domNode.addEventListener('mouseout', this.handleMouseout.bind(this));
  }
  init() {
    this.domNode.setAttribute('role', 'menu');

    let childElement = this.domNode.firstElementChild;
    while (childElement) {
      const menuElement = childElement.firstElementChild;
      if (menuElement && menuElement.tagName === 'A') {
        const menuItem = new MenuItem(menuElement, this);
        menuItem.init();
        this.menuitems.push(menuItem);
        const textContent = menuElement.textContent.trim();
        this.firstChars.push(textContent.substring(0, 1).toLowerCase());
      }
      childElement = childElement.nextElementSibling;
    }
    const numItems = this.menuitems.length;
    if (numItems > 0) {
      this.firstItem = this.menuitems[0];
      this.lastItem = this.menuitems[numItems - 1];
    }
  }
  handleMouseover(event) {
    this.hasHover = true;
  }
  handleMouseout(event) {
    this.hasHover = false;
    setTimeout(this.close(this, false), 1);
  }
  setFocusToController(commandParam, flag) {
    let command = commandParam;
    if (typeof command !== 'string') {
      command = '';
    }
    function setFocusToMenubarItem(controller, close) {
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
        return setFocusToMenubarItem(controller.menu.controller, close);
      }
      return false;
    }
    if (command === '') {
      if (this.controller && this.controller.domNode) {
        this.controller.domNode.focus();
      }
      return;
    }
    if (!this.controller.isMenubarItem) {
      this.controller.domNode.focus();
      this.close();
      if (command === 'next') {
        const menubarItem = setFocusToMenubarItem(this.controller, false);
        if (menubarItem) {
          menubarItem.menu.setFocusToNextItem(menubarItem, flag);
        }
      }
    } else {
      if (command === 'previous') {
        this.controller.menu.setFocusToPreviousItem(this.controller, flag);
      } else if (command === 'next') {
        this.controller.menu.setFocusToNextItem(this.controller, flag);
      }
    }
  }
  setFocusToFirstItem() {
    this.firstItem.domNode.focus();
  }
  setFocusToLastItem() {
    this.lastItem.domNode.focus();
  }
  setFocusToPreviousItem(currentItem) {
    let index;
    if (currentItem === this.firstItem) {
      this.lastItem.domNode.focus();
    } else {
      index = this.menuitems.indexOf(currentItem);
      this.menuitems[index - 1].domNode.focus();
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
      this.menuitems[index].domNode.focus();
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
}

export class MenuItem {
  constructor(domNode, menuObj) {
    this.domNode = domNode;
    this.menu = menuObj;
    this.popupMenu = false;
    this.isMenubarItem = false;
    this.domNode.addEventListener('keydown', this.handleKeydown.bind(this));
    this.domNode.addEventListener('click', this.handleClick.bind(this));
    this.domNode.addEventListener('focus', this.handleFocus.bind(this));
    this.domNode.addEventListener('blur', this.handleBlur.bind(this));
    this.domNode.addEventListener('mouseover', this.handleMouseover.bind(this));
    this.domNode.addEventListener('mouseout', this.handleMouseout.bind(this));
  }

  init() {
    const nextElement = this.domNode.nextElementSibling;

    if (nextElement && nextElement.tagName === 'UL') {
      this.popupMenu = new PopupMenu(nextElement, this);
      this.popupMenu.init();
    }
  }

  handleKeydown(event) {
    const { currentTarget, key } = event;
    let flag = false;
    let clickEvent;

    function isPrintableCharacter(str) {
      return str.length === 1 && str.match(/\S/);
    }

    switch (event.keyCode) {
      case KEYCODE.SPACE:
      case KEYCODE.RETURN:
        if (this.popupMenu) {
          this.popupMenu.open();
          this.popupMenu.setFocusToFirstItem();
        } else {
          // Create simulated mouse event to mimic the behavior of ATs
          // and let the event handler handleClick do the housekeeping.
          try {
            clickEvent = new MouseEvent('click', {
              view: window,
              bubbles: true,
              cancelable: true,
            });
          } catch (err) {
            if (document.createEvent) {
              // DOM Level 3 for IE 9+
              clickEvent = document.createEvent('MouseEvents');
              clickEvent.initEvent('click', true, true);
            }
          }
          currentTarget.dispatchEvent(clickEvent);
        }

        flag = true;
        break;

      case KEYCODE.UP:
        this.menu.setFocusToPreviousItem(this);
        flag = true;
        break;

      case KEYCODE.DOWN:
        this.menu.setFocusToNextItem(this);
        flag = true;
        break;

      case KEYCODE.LEFT:
        this.menu.setFocusToController('previous', true);
        this.menu.close(true);
        flag = true;
        break;

      case KEYCODE.RIGHT:
        if (this.popupMenu) {
          this.popupMenu.open();
          this.popupMenu.setFocusToFirstItem();
        } else {
          this.menu.setFocusToController('next', true);
          this.menu.close(true);
        }
        flag = true;
        break;

      case KEYCODE.HOME:
      case KEYCODE.PAGEUP:
        this.menu.setFocusToFirstItem();
        flag = true;
        break;

      case KEYCODE.END:
      case KEYCODE.PAGEDOWN:
        this.menu.setFocusToLastItem();
        flag = true;
        break;

      case KEYCODE.ESC:
        this.menu.setFocusToController();
        this.menu.close(true);
        flag = true;
        break;

      case KEYCODE.TAB:
        this.menu.setFocusToController();
        break;

      default:
        if (isPrintableCharacter(key)) {
          this.menu.setFocusByFirstCharacter(this, key);
          flag = true;
        }
        break;
    }

    if (flag) {
      event.stopPropagation();
      event.preventDefault();
    }
  }

  setExpanded(value) {
    if (value) {
      this.domNode.setAttribute('aria-expanded', 'true');
    } else {
      this.domNode.setAttribute('aria-expanded', 'false');
    }
  }

  handleClick(event) {
    this.menu.setFocusToController();
    this.menu.close(true);
  }

  handleFocus(event) {
    this.menu.hasFocus = true;
  }

  handleBlur(event) {
    this.menu.hasFocus = false;

    setTimeout(this.menu.close.bind(this.menu, false), 300);
  }

  handleMouseover(event) {
    this.menu.hasHover = true;
    this.menu.open();
    if (this.popupMenu) {
      this.popupMenu.hasHover = true;
      this.popupMenu.open();
    }
  }

  handleMouseout(event) {
    if (this.popupMenu) {
      this.popupMenu.hasHover = false;
      this.popupMenu.close(true);
    }
    this.menu.hasHover = false;
    setTimeout(this.menu.close.bind(this.menu, false), 300);
  }
}
