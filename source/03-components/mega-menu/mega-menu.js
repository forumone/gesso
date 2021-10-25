import Drupal from 'drupal';
import MegaMenu from './modules/MegaMenu';

Drupal.behaviors.megaMenu = {
  attach(context) {
    const menus = context.querySelectorAll('.mega-menu');
    if (menus.length) {
      menus.forEach(menu => {
        const megaMenu = new MegaMenu(menu);
        megaMenu.init();
      });
    }
  },
};
