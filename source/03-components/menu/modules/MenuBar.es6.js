import Menu from './Menu.es6';
import MenubarItem from './MenubarItem';

class MenuBar extends Menu {
  constructor(domNode) {
    super(domNode);

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
      if (elem && menuBarItem && !this.isValidTag(menuBarItem.tagName)) {
        throw new Error(
          `${msgPrefix} has child elements that are not A or Button elements. If you need to create a non-linked menu item within your menu, use 'route:<button>' instead of '<nolink>' in the link field.`
        );
      }
      elem = elem.nextElementSibling;
    }
    this.isMenubar = true;
  }

  createMenuItem(menuElement) {
    return new MenubarItem(menuElement, this);
  }

  init() {
    super.init();
    this.domNode.setAttribute('role', 'menubar');
    this.firstItem.setTabIndex(0);
  }

  // Set focus to a specific MenubarItem in the menu.
  setFocusToItem(newItem) {
    const newMenuItem = newItem;
    let openMenu = false;
    // Close any existing menus.
    this.menuItems.forEach(mbi => {
      const menuBarItem = mbi;
      if (mbi.domNode.tabIndex === 0) {
        openMenu = mbi.domNode.getAttribute('aria-expanded') === 'true';
      }

      menuBarItem.domNode.tabIndex = -1;
      if (mbi.popupMenu) {
        mbi.popupMenu.close();
      }
    });

    newMenuItem.domNode.focus();
    newMenuItem.domNode.tabIndex = 0;

    if (openMenu && newMenuItem.popupMenu) {
      newMenuItem.popupMenu.open();
    }
    // Focus on the new menu, and open it if the previous menu was open.
  }
}

export default MenuBar;
