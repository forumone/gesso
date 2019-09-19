'use strict';

import KEYCODE from '../constants/_KEYCODE.es6';
import { PopupMenu } from './_SubMenuItems.es6';

class MenubarItem {
  constructor(domNode, menuObj) {
    this.menu = menuObj;
    this.domNode = domNode;
    this.popupMenu = false;
    this.hasFocus = false;
    this.hasHover = false;
    this.isMenubarItem = true;
  }
  init() {
    const popupMenu = this.domNode.parentElement.querySelector('ul');
    if (popupMenu) {
      this.domNode.setAttribute('aria-haspopup', 'true');
      this.popupMenu = new PopupMenu(popupMenu, this);
      this.popupMenu.init();
    }

    this.domNode.addEventListener('keydown', this.handleKeydown.bind(this));
    this.domNode.addEventListener('focus', this.handleFocus.bind(this));
    this.domNode.addEventListener('blur', this.handleBlur.bind(this));
    this.domNode.addEventListener('mouseover', this.handleMouseover.bind(this));
    this.domNode.addEventListener('mouseout', this.handleMouseout.bind(this));
    this.domNode.tabIndex = -1;
  }
  handleKeydown(event) {
    const { key } = event;
    let flag = false;
    switch (event.keyCode) {
      case KEYCODE.SPACE:
      case KEYCODE.RETURN:
      case KEYCODE.DOWN:
        if (this.popupMenu) {
          this.popupMenu.open();
          this.popupMenu.setFocusToFirstItem();
          flag = true;
        }
        break;
      case KEYCODE.LEFT:
        this.menu.setFocusToPreviousItem(this);
        flag = true;
        break;
      case KEYCODE.RIGHT:
        this.menu.setFocusToNextItem(this);
        flag = true;
        break;
      case KEYCODE.UP:
        if (this.popupMenu) {
          this.popupMenu.open();
          this.popupMenu.setFocusToLastItem();
          flag = true;
        }
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
      case KEYCODE.TAB:
        if (this.popupMenu) {
          this.popupMenu.close(true);
        }
        break;
      case KEYCODE.ESC:
        if (this.popupMenu) {
          this.popupMenu.close(true);
        }
        break;
      default:
        if (this._isPrintableCharacter(key)) {
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
  handleFocus() {
    this.menu.setFocus(true);
  }
  handleBlur() {
    this.menu.setFocus(false);
  }
  handleMouseover() {
    this.hasHover = true;
    if (this.popupMenu) {
      this.popupMenu.open();
    }
  }
  handleMouseout() {
    this.hasHover = false;
    if (this.popupMenu) {
      setTimeout(this.popupMenu.close.bind(this.popupMenu, false), 300);
    }
  }
  setTabIndex(value) {
    this.domNode.tabIndex = value;
  }
  open(openSubMenu = false) {
    this.domNode.focus();
    this.setTabIndex(0);
    if (openSubMenu && this.popupMenu) {
      this.popupMenu.open();
    }
  }
  close() {
    const menuWasOpen =
      this.domNode.tabIndex === 0 &&
      this.domNode.getAttribute('aria-expanded') === 'true';
    this.setTabIndex(-1);
    if (this.popupMenu) {
      this.popupMenu.close();
    }
    return menuWasOpen;
  }
  focusOnNextSibling() {
    this.menu.setFocusToNextItem(this);
  }
  focusOnPreviousSibling() {
    this.menu.setFocusToPreviousItem(this);
  }
  _isPrintableCharacter(str) {
    return str.length === 1 && str.match(/\S/);
  }
}

export default MenubarItem;
