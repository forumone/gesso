import Drupal from 'drupal';
import once from 'once';
import MenuBar from './modules/_MenuBar.source';
import MobileMenu from '../mobile-menu/modules/_MobileMenu.source.js';

Drupal.behaviors.dropdownMenu = {
  attach(context) {
    const menus = once('dropdown-menu', '.c-dropdown-menu', context);

    menus.forEach(menu => {
      const dropdownMenu = new MenuBar(menu);
      dropdownMenu.init();
      const mobileMenu = new MobileMenu(menu, context, {
        classPrefix: 'c-dropdown-menu',
      });
      mobileMenu.init();
    });
  },
};
