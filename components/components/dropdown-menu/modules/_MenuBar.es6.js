import Menu from './_Menu.es6';
import MenubarItem from './_MenubarItem.es6';

class MenuBar extends Menu {
  /**
   * @inheritdoc
   */
  constructor(
    domNode,
    {
      useArrowKeys = true,
      displayMenuOnHover = true,
      submenuSelector = '.c-dropdown-menu__subnav',
    } = {}
  ) {
    super(domNode, { useArrowKeys, displayMenuOnHover, submenuSelector });

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
          `${msgPrefix} has child elements that are not A or Button elements. If you need to create a non-linked menu item within your menu, use '<button>' instead of '<nolink>' in the link field.`
        );
      }
      elem = elem.nextElementSibling;
    }
    this.isMenubar = true;
  }

  /**
   * @inheritdoc
   */
  createMenuItem(menuElement) {
    return new MenubarItem(menuElement, this);
  }
}

export default MenuBar;
