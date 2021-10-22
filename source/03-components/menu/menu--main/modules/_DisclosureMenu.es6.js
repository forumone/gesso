import Menu from "./_Menu.es6";

/**
 * @file
 * Disclosure menu pattern.
 * @see https://w3c.github.io/aria-practices/examples/disclosure/disclosure-navigation-hybrid.html
 */
class DisclosureMenu {
  constructor(domNode) {
    this.domNode = domNode;
    this.menuItems = [];
    this.topLevelMenuItems = [
      ...this.domNode.querySelectorAll('a, button')
    ];
  }

  createMenuItem(menuElement) {

  }
}
