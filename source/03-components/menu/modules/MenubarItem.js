import KEYCODE from '../../../00-config/_KEYCODE.es6';

import MenuItem from './MenuItem.es6';

class MenubarItem extends MenuItem {
  constructor(domNode, menuObj) {
    super(domNode, menuObj);
    this.isMenubarItem = true;
  }

  init() {
    super.init();
    this.domNode.tabIndex = -1;
  }

  setTabIndex(value) {
    this.domNode.tabIndex = value;
  }

  focusOnSelf() {
    this.domNode.focus();
  }

  focusOnPreviousSibling() {
    this.menu.setFocusToPreviousItem(this);
  }

  focusOnNextSibling() {
    this.menu.setFocusToNextItem(this);
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
        if (this.isPrintableCharacter(key)) {
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
}

export default MenubarItem;
