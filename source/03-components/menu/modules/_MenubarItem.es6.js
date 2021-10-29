import MenuItem from './_MenuItem.es6';
import PopupMenu from './_PopupMenu.es6';

class MenubarItem extends MenuItem {
  /**
   * @inheritdoc
   */
  constructor(domNode, menuObj) {
    super(domNode, menuObj);
    this.isMenubarItem = true;
    this.handleClick = this.handleClick.bind(this);
  }

  /**
   * Initialize the menu item and create the submenu.
   * @override
   * @return void;
   */
  init() {
    super.init();
    const popupMenu = this.domNode.parentElement.querySelector(
      this.menu.options.submenuSelector
    );
    if (popupMenu) {
      this.popupMenu = new PopupMenu(popupMenu, this, this.menu.options);
      this.popupMenu.init();
    }
    if (this.domNode.tagName === 'BUTTON') {
      this.domNode.addEventListener('click', this.handleClick);
    }
  }

  destroy() {
    super.destroy();
    if (this.popupMenu) {
      this.popupMenu.destroy();
    }
    if (this.domNode.tagName === 'BUTTON') {
      this.domNode.removeEventListener('click', this.handleClick);
    }
  }

  /**
   * @inheritdoc
   */
  handleKeydown(event) {
    const { key } = event;
    let flag = false;
    if (
      !this.menu.options.useArrowKeys &&
      this.key !== ' ' &&
      this.key !== 'Spacebar' &&
      this.key !== 'Escape'
    )
      return;
    switch (key) {
      case ' ':
      case 'Spacebar':
      case 'ArrowDown':
        if (this.popupMenu) {
          this.popupMenu.open();
          this.popupMenu.setFocusToFirstItem();
        }
        flag = true;
        break;
      case 'ArrowLeft':
        this.menu.setFocusToPreviousItem(this);
        flag = true;
        break;
      case 'ArrowRight':
        this.menu.setFocusToNextItem(this);
        flag = true;
        break;
      case 'ArrowUp':
        if (this.popupMenu) {
          this.popupMenu.open();
          this.popupMenu.setFocusToLastItem();
        }
        flag = true;
        break;
      case 'Home':
      case 'PageUp':
        this.menu.setFocusToFirstItem();
        flag = true;
        break;
      case 'End':
      case 'PageDown':
        this.menu.setFocusToLastItem();
        flag = true;
        break;
      case 'Tab':
        if (this.popupMenu) {
          this.popupMenu.close(true);
        }
        break;
      case 'Escape':
        if (this.popupMenu) {
          this.popupMenu.close(true);
        }
        break;
      default:
        break;
    }
    if (flag) {
      event.stopPropagation();
      event.preventDefault();
    }
  }

  handleClick(event) {
    event.preventDefault();

    if (this.popupMenu) {
      if (this.domNode.getAttribute('aria-expanded') === 'true') {
        this.popupMenu.close(true);
      } else {
        this.popupMenu.open();
      }
    }
  }
}

export default MenubarItem;
