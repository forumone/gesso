import PopupMenu from './PopupMenu.es6';

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

  isPrintableCharacter(str) {
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

export default MenuItem;
