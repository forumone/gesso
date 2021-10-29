import MenuItem from './_MenuItem.es6';
// Because the menu can be multiple levels deep,
// SubMenuItems can contain PopupMenus that in turn
// contain SubMenuItems.
// eslint-disable-next-line import/no-cycle
import PopupMenu from './_PopupMenu.es6';

class SubMenuItem extends MenuItem {
  /**
   * @constructor
   * @param {HTMLElement} domNode - The menu DOM element.
   * @param {PopupMenu} menuObj - The Menu to which this menu item belongs.
   */
  constructor(domNode, menuObj) {
    super(domNode, menuObj);
    this.menu = menuObj;
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
      this.popupMenu = new PopupMenu(popupMenu, this);
      this.popupMenu.init();
    }
    this.domNode.addEventListener('click', this.handleClick);
  }

  /**
   * @inheritdoc
   */
  destroy() {
    super.destroy();
    if (this.popupMenu) {
      this.popupMenu.destroy();
    }
    this.domNode.removeEventListener('click', this.handleClick);
  }

  /**
   * @inheritdoc
   */
  handleKeydown(event) {
    const { currentTarget, key } = event;
    let flag = false;
    let clickEvent;
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
        if (this.popupMenu) {
          this.popupMenu.open();
          this.popupMenu.setFocusToFirstItem();
        } else {
          // Create simulated mouse event to mimic the behavior of ATs
          // and let the event handler handleClick do the housekeeping.
          clickEvent = new MouseEvent('click', {
            view: window,
            bubbles: true,
            cancelable: true,
          });
          currentTarget.dispatchEvent(clickEvent);
        }
        flag = true;
        break;

      case 'ArrowUp':
        this.menu.setFocusToPreviousItem(this);
        flag = true;
        break;

      case 'ArrowDown':
        this.menu.setFocusToNextItem(this);
        flag = true;
        break;

      case 'ArrowLeft':
        this.menu.setFocusToController('previous');
        this.menu.close(true);
        flag = true;
        break;

      case 'ArrowRight':
        if (this.popupMenu) {
          this.popupMenu.open();
          this.popupMenu.setFocusToFirstItem();
        } else {
          this.menu.setFocusToController('next');
          this.menu.close(true);
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

      case 'Escape':
        this.menu.setFocusToController('');
        this.menu.close(true);
        flag = true;
        break;

      default:
        break;
    }

    if (flag) {
      event.stopPropagation();
      event.preventDefault();
    }
  }

  /**
   * Handle clicks on the menu item.
   * @return {void}
   */
  handleClick() {
    if (this.domNode.tagName === 'BUTTON') {
      this.menu.setFocusToController('');
      this.menu.close(true);
    }
  }

  /**
   * Handle unsetting keyboard focus on the menu item.
   * @return {void}
   */
  handleBlur() {
    super.handleBlur();
    setTimeout(this.menu.close.bind(this.menu, false), 300);
  }

  /**
   * Handle hovers over the menu item.
   * @return {void}
   */
  handleMouseover() {
    this.menu.setHover(true);
    if (this.menu.options.displayMenuOnHover) {
      this.menu.open();
    }
    super.handleMouseover();
  }

  /**
   * Handle mousing away from the menu item.
   * @return {void}
   */
  handleMouseout() {
    super.handleMouseout();
    this.menu.setHover(false);
    if (this.menu.options.displayMenuOnHover) {
      setTimeout(this.menu.close.bind(this.menu, false), 300);
    }
  }
}

export default SubMenuItem;
