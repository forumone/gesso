import Drupal from 'drupal';
import once from 'once';
import MegaMenu from './modules/MegaMenu.es6';
import MobileMenu from '../mobile-menu/modules/_MobileMenu.es6';

Drupal.behaviors.megaMenu = {
  attach(context) {
    const menus: NodeListOf<HTMLElement> =
      once('mega-menu', '.c-mega-menu', context);

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
