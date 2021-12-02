import Drupal from 'drupal';
import MobileMenu from '../mobile-menu/modules/_MobileMenu.es6';
import MenuBar from './modules/_MenuBar.es6';

Drupal.behaviors.dropdownMenu = {
  attach(context) {
    const menuNodes = context.querySelectorAll('.c-dropdown-menu');
    if (menuNodes.length) {
      menuNodes.forEach(menuNode => {
        const dropdownMenu = new MenuBar(menuNode);
        dropdownMenu.init();
        const mobileMenu = new MobileMenu(menuNode, context, {
          classPrefix: 'c-dropdown-menu',
        });
        mobileMenu.init();
      });
    }
  },
};
