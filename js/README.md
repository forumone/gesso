# JavaScript Plugins

Gesso comes with two plugins for menus.

`primary-menu.es6.js` creates a menu bar that follows the
[WAI ARIA authoring practices](https://www.w3.org/TR/wai-aria-practices-1.1/examples/menubar/menubar-1/menubar-1.html).

`mobile-menu.es6.js` creates a mobile menu displayed in an overlay. Depending on
the options you select, it can include main navigation links, utility navigation
links, and/or a search block display.

You can use both menu scripts together. The mobile menu will hide the original
menus when the mobile menu is in use.

## Primary Menu

The styles for this menu are in `source/_patterns/04-components/menus/menu--main`.
By default, the script is applied to a menu with the class `menu--main`. To use
a different class, change the query selector in `primary-menu.es6.js`. This
script is not included by default in Pattern Lab or Drupal.

## Mobile Menu

The styles for the overall mobile menu component are in
`source/_patterns/04-components/mobile-menu`. Styles for the mobile menu buttons
are in `source/_patterns/04-components/mobile-menu-button/`.

The `MobileMenu` constructor takes several options that can be used in
`mobile-menu.es6.js` to customize the mobile menu or anywhere else you need menu
content opened in an overlay.

- `toggleSubnav`: Enable toggle display of subnavs. (default: `true`)

- `navMenu`: Selector for the main menu to include in the mobile menu
  (default: `.menu--main`)

- `searchBlock`: Selector for the search form to include in the mobile menu
  (default: no search block is included)

- `utilityMenu`: Selector for the utility menu to include in the mobile menu
  (default: no utility menu is included)

- `header`: Selector for the site header, which is used to position the toggle
  button and menu container if they are dynamically created
  (default: `.l-header`)

- `toggleButton`: Selector for the button that will show the mobile menu. If
  empty or if no element matching the selector can be found, a toggle button
  will be automatically created. (default: `.mobile-menu-button--menu`)

- `container`: Selector for the container into which the mobile menu should be
  inserted. If empty or if no element matching the selector can be found, the
  menu will be inserted after the header or, if the header also cannot be found,
  at the beginning of the `<body>` element. (default: `.mobile-menu-container`)

- `menuItem`: Selector used to identify individual menu items in the main menu
  (default: `.menu__item`)

- `menuItemClass`: Class name to add to the individual menu items once within
  the mobile menu (default: `.mobile-menu__item`)

- `menuLink`: Selector used to identify individual menu links in the main menu
  (default: `.menu__link`)

- `menuLinkClass`: Class name to add to the individual menu links once within
  the mobile menu (default: `.mobile-menu__link`)

- `menuSubMenu`: Selector used to identify submenus in the main menu
  (default: `.menu__subnav`)

- `menuSubMenuClass`: Class name to add to the submenus once within
  the mobile menu (default: `.mobile-menu__subnav`)

- `overlayClass`: CSS class to apply to the mobile overlay
  (default: `mobile-menu`)

- `mobileMenuClass`: CSS class to apply to the set of main navigation links in
  the mobile menu (default: `mobile-menu__menu`)

- `mobileSearchClass`: CSS class to apply to the search section of the mobile
  menu, if used (default: `mobile-menu__search`)

- `mobileUtilityMenuClass`: CSS class to apply to the utility nav section of the
  mobile menu, if used (default: `mobile-menu__menu`)

- `buttonClass`: CSS class to apply to all mobile menu buttons (both open and
  close) (default: `mobile-menu-button`)

- `menuButtonClass`: Additional CSS class to apply to the menu button
  (default: `mobile-menu-button--menu`)

- `closeButtonClass`: Additional CSS class to apply to the close button
  (default: `mobile-menu-button--close`)

- `arrowButtonClass`: CSS class to apply to the subnav toggle buttons, if the
  `toggleSubnav` option is used (default: `mobile-menu__subnav-arrow`)

- `mobileMenuBreakpoint`: Media query used to determine when to show the mobile
  menu. (default: `(max-width: 699px)`)

Example:

```
const mobileMenu = new MobileMenu({
  navMenu: '#main-menu',
  searchBlock: '#block-search',
  utilityMenu: '#utility-menu',
  overlayClass: 'overlay-menu',
  mobileMenuBreakpoint: '(max-width: 1199px)',
});
```

This will customize the mobile menu to clone the specified menus and search
block, use the class `overlay-menu` on the overlay wrapper, and display the
mobile menu on devices 1199px wide or smaller.
