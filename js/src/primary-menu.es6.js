import { MenuBar } from './modules/_Menu.es6';
import Drupal from 'drupal';

(function(Drupal) {
  'use strict';

  // The styling for this mobile menu is located in source/_patterns/04-components/menus/menu--main/.

  Drupal.behaviors.primaryNav = {
    attach(context) {
      const submenuNode = context.querySelector('.menu--submenu');
      if (submenuNode) {
        const myMenu = new MenuBar(submenuNode);
        myMenu.init();
      }
    },
  };
})(Drupal);
