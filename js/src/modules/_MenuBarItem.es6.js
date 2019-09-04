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
    this.domNode.addEventListener('keydown', this.handleKeydown.bind(this));
    this.domNode.addEventListener('focus', this.handleFocus.bind(this));
    this.domNode.addEventListener('blur', this.handleBlur.bind(this));
    this.domNode.addEventListener('mouseover', this.handleMouseover.bind(this));
    this.domNode.addEventListener('mouseout', this.handleMouseout.bind(this));
  }
  init() {
    this.domNode.tabIndex = -1;

    let nextElement = this.domNode.nextElementSibling;
    if (nextElement && nextElement.tagName == 'UL') {
      this.domNode.setAttribute('aria-haspopup', 'true');
      this.popupMenu = new PopupMenu(nextElement, this);
      this.popupMenu.init();
    }
  }
  handleKeydown(event) {
    var tgt = event.currentTarget,
      char = event.key,
      flag = false,
      clickEvent;
    function isPrintableCharacter(str) {
      return str.length === 1 && str.match(/\S/);
    }
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
        if (isPrintableCharacter(char)) {
          this.menu.setFocusByFirstCharacter(this, char);
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
  handleFocus(event) {
    this.menu.hasFocus = true;
  }
  handleBlur(event) {
    this.menu.hasFocus = false;
  }
  handleMouseover(event) {
    this.hasHover = true;
    if (this.popupMenu) {
      this.popupMenu.open();
    }
  }
  handleMouseout(event) {
    this.hasHover = false;
    if (this.popupMenu) {
      setTimeout(this.popupMenu.close.bind(this.popupMenu, false), 300);
    }
  }
}

export default MenubarItem;
