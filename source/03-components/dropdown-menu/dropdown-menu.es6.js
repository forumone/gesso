import Drupal from 'drupal';
import MobileMenu from '../mobile-menu/modules/_MobileMenu.es6';
import MenuBar from './modules/_MenuBar.es6';

Drupal.behaviors.dropdownMenu = {
  attach(context) {
    const menuNode = context.querySelector('.dropdown-menu');
    if (menuNode) {
      const dropdownMenu = new MenuBar(menuNode);
      dropdownMenu.init();
      const mobileMenu = new MobileMenu(menuNode, context, {
        classPrefix: 'dropdown-menu',
      });
      mobileMenu.init();
    }
  },
};
