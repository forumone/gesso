import Drupal from 'drupal';
import once from 'once';
import SideMenu from './modules/_SideMenu.es6';

Drupal.behaviors.sideMenu = {
  attach(context) {
    const menus: NodeListOf<HTMLElement> =
      once('side-menu', '.c-side-menu', context);

    menus.forEach(menu => {
      const sideMenu = new SideMenu(menu);
      sideMenu.init();
    });
  },
};
