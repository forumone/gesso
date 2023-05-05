import Drupal from 'drupal';
import once from 'once';
import OverlayMenu from './modules/_OverlayMenu.es6';

Drupal.behaviors.overlayMenu = {
  attach(context) {
    const menus: NodeListOf<HTMLElement> =
      once('overlay-menu', '.c-overlay-menu', context);

    menus.forEach(menu => {
      const overlayMenu = new OverlayMenu(menu);
      overlayMenu.init();
    });
  },
};
