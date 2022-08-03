import Drupal from 'drupal';
import OverlayMenu from './modules/_OverlayMenu.es6';

Drupal.behaviors.overlayMenu = {
  attach(context) {
    const menus: NodeListOf<HTMLElement> =
      context.querySelectorAll('.c-overlay-menu');

    menus.forEach(menu => {
      const overlayMenu = new OverlayMenu(menu);
      overlayMenu.init();
    });
  },
};
