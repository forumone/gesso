import { MenuBar } from './modules/_Menu.es6';
import Drupal from 'drupal';

(function(Drupal) {
  'use strict';

  // The styling for this mobile menu is located in pattern-lab/source/_patterns/03-components/mobile-menu/_mobile-menu.scss.

  Drupal.behaviors.primaryNav = {
    attach(context) {
      const submenuNode = context.querySelector('.menu--main');
      if (submenuNode) {
        const myMenu = new MenuBar(submenuNode);
        myMenu.init();
      }
    },
  };
})(Drupal);
