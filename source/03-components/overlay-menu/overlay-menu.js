import Drupal from 'drupal';
import OverlayMenu from './modules/OverlayMenu';

Drupal.behaviors.overlayMenu = {
  attach(context) {
    const menus = context.querySelectorAll('.overlay-menu');
    if (menus.length) {
      menus.forEach(menu => {
        const overlayMenu = new OverlayMenu(menu);
        overlayMenu.init();
      });
    }
  },
};
