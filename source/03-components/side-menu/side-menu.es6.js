import Drupal from 'drupal';
import SideMenu from './modules/_SideMenu.es6';

Drupal.behaviors.sideMenu = {
  attach(context) {
    const menus = context.querySelectorAll('.c-side-menu');
    if (menus.length) {
      menus.forEach(menu => {
        const sideMenu = new SideMenu(menu);
        sideMenu.init();
      });
    }
  },
};
