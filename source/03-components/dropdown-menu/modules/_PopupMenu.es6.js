// Because the menu can be multiple levels deep,
// SubMenuItems can contain PopupMenus that in turn
// contain SubMenuItems.
// eslint-disable-next-line import/no-cycle
import SubMenuItem from './_SubMenuItem.es6';
import { Z_INDEX } from '../../../00-config/_GESSO.es6';
import Menu from './_Menu.es6';

class PopupMenu extends Menu {
  /**
   * @constructor
   * @param {HTMLElement} domNode - The DOM element for the subnav.
   * @param {MenuItem} controllerObj - The parent MenuItem
   * @param {boolean} useArrowKeys - Whether to enable navigation by arrow
   *   keys.
   * @param {boolean} displayMenuOnHover - Whether to show submenus when parent
   *   link is hovered over
   */
  constructor(
    domNode,
    controllerObj,
    {
      useArrowKeys = true,
      displayMenuOnHover = true,
      submenuSelector = '.c-dropdown-menu__subnav',
    } = {}
  ) {
    super(domNode, { useArrowKeys, displayMenuOnHover, submenuSelector });
    this.controller = controllerObj;
    this.handleMouseout = this.handleMouseout.bind(this);
    this.handleMouseover = this.handleMouseover.bind(this);
  }

  /**
   * @inheritdoc
   */
  createMenuItem(menuElement) {
    return new SubMenuItem(menuElement, this);
  }

  /**
   * @inheritdoc
   */
  init() {
    super.init();
    // Add event handlers.
    this.domNode.addEventListener('mouseover', this.handleMouseover);
    this.domNode.addEventListener('mouseout', this.handleMouseout);
  }

  destroy() {
    super.destroy();
    this.domNode.removeEventListener('mouseover', this.handleMouseover);
    this.domNode.removeEventListener('mouseout', this.handleMouseover);
  }

  /**
   * Send a focus command to the controlling menu item.
   * @param {''|'previous'|'next'} commandParam - The focus command
   * @return {void}
   */
  setFocusToController(commandParam) {
    let command = commandParam;
    if (typeof command !== 'string') {
      command = '';
    }
    if (command === '') {
      if (this.controller) {
        this.controller.focusOnSelf();
      }
      return;
    }
    if (command === 'previous') {
      this.controller.focusOnPreviousSibling();
    } else if (command === 'next') {
      this.controller.focusOnNextSibling();
    }
  }

  /**
   * Open the submenu.
   * @return {void}
   */
  open() {
    // Get position and bounding rectangle of controller object's DOM node
    const rect = this.controller.getBoundaries();
    // Set CSS properties
    if (!this.controller.getIsMenubarItem()) {
      this.domNode.parentNode.style.position = 'relative';
      this.domNode.style.display = 'block';
      this.domNode.style.position = 'absolute';
      this.domNode.style.left = `${rect.width}px`;
      this.domNode.style.zIndex = Z_INDEX.drawer.toString();
    } else {
      this.domNode.style.display = 'block';
      this.domNode.style.position = 'absolute';
      this.domNode.style.top = `${rect.height - 1}px`;
      this.domNode.style.zIndex = Z_INDEX.drawer.toString();
    }
    this.controller.setExpanded(true);
  }

  /**
   * Close the submenu
   * @param {boolean} force - If true, the menu will be closed even if it
   *   currently has focus
   */
  close(force) {
    let controllerHasHover = this.controller.getHover();
    let { hasFocus } = this;

    for (let i = 0; i < this.menuItems.length; i += 1) {
      const mi = this.menuItems[i];
      if (mi.popupMenu) {
        hasFocus = hasFocus || mi.popupMenu.hasFocus;
      }
    }

    if (!this.controller.getIsMenubarItem()) {
      controllerHasHover = false;
    }

    if (force || (!hasFocus && !this.hasHover && !controllerHasHover)) {
      this.domNode.style.display = 'none';
      this.domNode.style.zIndex = '0';
      this.controller.setExpanded(false);
    }
  }

  /**
   * Handle the user mousing over the submenu.
   * @return {void}
   */
  handleMouseover() {
    this.hasHover = true;
  }

  /**
   * Handle the user mousing away from the submenu.
   * @return {void}
   */
  handleMouseout() {
    this.hasHover = false;
  }
}

export default PopupMenu;
