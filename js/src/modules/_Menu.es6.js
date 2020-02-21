import { MenubarItem, SubMenuItem } from './_MenuItem.es6';
import { Z_INDEX } from '../constants/_GESSO.es6';

class Menu {
  constructor(domNode) {
    this.domNode = domNode; // DOM node containing the menu.
    this.menuItems = []; // Set of items in the menu.
    this.firstChars = [];
    this.firstItem = null; // First menu item.
    this.lastItem = null; // Last menu item.
    this.hasFocus = false;
    this.hasHover = false;
    this.isMenubar = false;
  }

  // Allow an empty function here because this is an abstract class.
  // eslint-disable-next-line no-empty-function
  _createMenuItem(menuElement) {}

  init() {
    // Set up any and all submenu items.
    if (this.domNode.children.length > 0) {
      const nodesArray = [].slice.call(this.domNode.children);
      nodesArray.forEach(childElement => {
        const menuElement = childElement.firstElementChild;
        if (menuElement && menuElement.tagName === 'A') {
          const menuItem = this._createMenuItem(menuElement);
          menuItem.init();
          this.menuItems.push(menuItem);
          const textContent = menuElement.textContent.trim();
          this.firstChars.push(textContent.substring(0, 1).toLowerCase());
        }
      });
    }

    // Store the first and last items in the menu.
    const numItems = this.menuItems.length;
    if (numItems > 0) {
      this.firstItem = this.menuItems[0];
      this.lastItem = this.menuItems[numItems - 1];
    }
  }

  setFocus(state) {
    this.hasFocus = state;
  }

  setHover(state) {
    this.hasHover = state;
  }

  // Allow an empty function here because this is an abstract class.
  // eslint-disable-next-line no-empty-function
  setFocusToItem(newItem) {}

  setFocusToFirstItem() {
    this.setFocusToItem(this.firstItem);
  }

  setFocusToLastItem() {
    this.setFocusToItem(this.lastItem);
  }

  setFocusToPreviousItem(currentItem) {
    let newItem = false;
    if (currentItem === this.firstItem) {
      newItem = this.lastItem;
    } else {
      const index = this.menuItems.indexOf(currentItem);
      newItem = this.menuItems[index - 1];
    }
    if (newItem) {
      this.setFocusToItem(newItem);
    }
  }

  setFocusToNextItem(currentItem) {
    let newItem = false;
    if (currentItem === this.lastItem) {
      newItem = this.firstItem;
    } else {
      const index = this.menuItems.indexOf(currentItem);
      newItem = this.menuItems[index + 1];
    }
    if (newItem) {
      this.setFocusToItem(newItem);
    }
  }
  setFocusByFirstCharacter(currentItem, char) {
    const currChar = char.toLowerCase();
    let start = this.menuItems.indexOf(currentItem) + 1;
    if (start === this.menuItems.length) {
      start = 0;
    }
    let index = this._getIndexFirstChars(start, currChar);
    if (index === -1) {
      index = this._getIndexFirstChars(0, currChar);
    }
    if (index > -1) {
      this.setFocusToItem(this.menuItems[index]);
    }
  }

  _getIndexFirstChars(startIndex, char) {
    for (let i = startIndex; 1 < this.firstChars.length; i++) {
      if (char === this.firstChars[i]) {
        return i;
      }
    }
    return -1;
  }
}

export class MenuBar extends Menu {
  constructor(domNode) {
    // Validate that the domNode is a menu that can be made into a MenuBar.
    const msgPrefix = 'Menubar constructor argument menuBarNode';
    if (!(domNode instanceof Element)) {
      throw new TypeError(`${msgPrefix} is not a Dom Element`);
    }
    if (domNode.childElementCount === 0) {
      throw new Error(`${msgPrefix} does not have element children`);
    }
    let elem = domNode.firstElementChild;
    while (elem) {
      const menuBarItem = elem.firstElementChild;
      if (elem && menuBarItem && menuBarItem.tagName !== 'A') {
        throw new Error(`${msgPrefix} has child elements are not A elements`);
      }
      elem = elem.nextElementSibling;
    }
    super(domNode);
    this.isMenubar = true;
  }

  _createMenuItem(menuElement) {
    return new MenubarItem(menuElement, this);
  }

  init() {
    super.init();
    this.domNode.setAttribute('role', 'menubar');
    this.firstItem.setTabIndex(0);
  }

  // Set focus to a specific MenubarItem in the menu.
  setFocusToItem(newItem) {
    let openMenu = false;
    // Close any existing menus.
    this.menuItems.forEach(mbi => {
      if (mbi.domNode.tabIndex === 0) {
        openMenu = mbi.domNode.getAttribute('aria-expanded') === 'true';
      }

      mbi.domNode.tabIndex = -1;
      if (mbi.popupMenu) {
        mbi.popupMenu.close();
      }
    });

    newItem.domNode.focus();
    newItem.domNode.tabIndex = 0;

    if (openMenu && newItem.popupMenu) {
      newItem.popupMenu.open();
    }
    // Focus on the new menu, and open it if the previous menu was open.
  }
}

export class PopupMenu extends Menu {
  constructor(domNode, controllerObj) {
    super(domNode);
    this.controller = controllerObj;
  }

  _createMenuItem(menuElement) {
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
    let hasFocus = this.hasFocus;

    for (let i = 0; i < this.menuItems.length; i++) {
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
