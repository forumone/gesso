import Drupal from 'drupal';
import OverlayMenu from './modules/_OverlayMenu.es6';

Drupal.behaviors.overlayMenu = {
  attach(context) {
    const menus = context.querySelectorAll('.c-overlay-menu');
    if (menus.length) {
      menus.forEach(menu => {
        const overlayMenu = new OverlayMenu(menu);
        overlayMenu.init();
      });
    }
  },
};
