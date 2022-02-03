import Drupal from 'drupal';
import MegaMenu from './modules/MegaMenu.es6';
import MobileMenu from '../mobile-menu/modules/_MobileMenu.es6';

Drupal.behaviors.megaMenu = {
  attach(context) {
    const menus: NodeListOf<HTMLElement> =
      context.querySelectorAll('.c-mega-menu');

    menus.forEach(menu => {
      const megaMenu = new MegaMenu(menu);
      megaMenu.init();
      const mobileMenu = new MobileMenu(menu, context, {
        classPrefix: 'c-mega-menu',
      });
      mobileMenu.init();
    });
  },
};
