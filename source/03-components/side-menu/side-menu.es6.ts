import Drupal from 'drupal';
import SideMenu from './modules/_SideMenu.es6';

Drupal.behaviors.sideMenu = {
  attach(context) {
    const menus: NodeListOf<HTMLElement> =
      context.querySelectorAll('.c-side-menu');

    menus.forEach(menu => {
      const sideMenu = new SideMenu(menu);
      sideMenu.init();
    });
  },
};
