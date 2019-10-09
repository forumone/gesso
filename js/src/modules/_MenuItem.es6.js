import KEYCODE from '../constants/_KEYCODE.es6';
import { PopupMenu } from './_Menu.es6';

/**
 * @abstract
 */
class MenuItem {
  constructor(domNode, menuObj) {
    this.menu = menuObj;
    this.domNode = domNode;
    this.popupMenu = false;
    this.isMenubarItem = false;
    this.hasFocus = false;
    this.hasHover = false;
  }

  _isPrintableCharacter(str) {
    return str.length === 1 && str.match(/\S/);
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
  }

  setExpanded(value) {
    if (value) {
      this.domNode.setAttribute('aria-expanded', 'true');
    } else {
      this.domNode.setAttribute('aria-expanded', 'false');
    }
  }

  getBoundaries() {
    return this.domNode.getBoundingClientRect();
  }

  getIsMenubarItem() {
    return this.isMenubarItem;
  }

  getHover() {
    return this.hasHover;
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
      this.popupMenu.setHover(true);
      this.popupMenu.open();
    }
  }
  handleMouseout() {
    this.hasHover = false;
    if (this.popupMenu) {
      this.popupMenu.setHover(false);
      setTimeout(this.popupMenu.close.bind(this.popupMenu, false), 300);
    }
  }
}

export class MenubarItem extends MenuItem {
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
}

export class SubMenuItem extends MenuItem {
  init() {
    super.init();
    this.domNode.addEventListener('click', this.handleClick.bind(this));
  }

  handleKeydown(event) {
    const { currentTarget, key } = event;
    let flag = false;
    let clickEvent;

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

  handleClick() {
    this.menu.setFocusToController();
    this.menu.close(true);
  }

  handleBlur() {
    super.handleBlur();
    setTimeout(this.menu.close.bind(this.menu, false), 300);
  }

  handleMouseover() {
    this.menu.setHover(true);
    this.menu.open();
    super.handleMouseover();
  }

  handleMouseout() {
    super.handleMouseout();
    this.menu.setHover(false);
    setTimeout(this.menu.close.bind(this.menu, false), 300);
  }
}
