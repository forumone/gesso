import Drupal from 'drupal';
import MegaMenu from './modules/MegaMenu';
import MobileMenu from '../menu/modules/_MobileMenu.es6';

Drupal.behaviors.megaMenu = {
  attach(context) {
    const menus = context.querySelectorAll('.mega-menu');
    if (menus.length) {
      menus.forEach(menu => {
        const megaMenu = new MegaMenu(menu);
        megaMenu.init();
        const mobileMenu = new MobileMenu({
          navMenu: menu,
        });
        mobileMenu.init();
      });
    }
  },
};
