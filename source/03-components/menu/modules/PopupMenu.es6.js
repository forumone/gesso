// Because the menu can be multiple levels deep,
// SubMenuItems can contain PopupMenus that in turn
// contain SubMenuItems.
// eslint-disable-next-line import/no-cycle
import SubMenuItem from './SubMenuItem.es6';
import { Z_INDEX } from '../../../00-config/_GESSO.es6';
import Menu from './Menu.es6';

class PopupMenu extends Menu {
  constructor(domNode, controllerObj) {
    super(domNode);
    this.controller = controllerObj;
  }

  createMenuItem(menuElement) {
    return new SubMenuItem(menuElement, this);
  }

  init() {
    super.init();
    this.domNode.setAttribute('role', 'menu');
    // Add event handlers.
    this.domNode.addEventListener('mouseover', this.handleMouseover.bind(this));
    this.domNode.addEventListener('mouseout', this.handleMouseout.bind(this));
  }

  setFocusToItem(newItem) {
    newItem.domNode.focus();
  }

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

  open() {
    // Get position and bounding rectangle of controller object's DOM node
    const rect = this.controller.getBoundaries();
    // Set CSS properties
    if (!this.controller.getIsMenubarItem()) {
      this.domNode.parentNode.style.position = 'relative';
      this.domNode.style.display = 'block';
      this.domNode.style.position = 'absolute';
      this.domNode.style.left = `${rect.width}px`;
      this.domNode.style.zIndex = Z_INDEX.drawer;
    } else {
      this.domNode.style.display = 'block';
      this.domNode.style.position = 'absolute';
      this.domNode.style.top = `${rect.height - 1}px`;
      this.domNode.style.zIndex = Z_INDEX.drawer;
    }
    this.controller.setExpanded(true);
  }

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

  handleMouseover() {
    this.hasHover = true;
  }

  handleMouseout() {
    this.hasHover = false;
  }
}

export default PopupMenu;
