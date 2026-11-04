import Drupal from 'drupal';
import once from 'once';
import OverlayMenu from './modules/_OverlayMenu.source';

Drupal.behaviors.overlayMenu = {
  attach(context) {
    const menus = once('overlay-menu', '.c-overlay-menu', context);

    menus.forEach(menu => {
      const overlayMenu = new OverlayMenu(menu);
      overlayMenu.init();
    });
  },
};
