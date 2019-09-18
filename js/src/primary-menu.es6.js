import MenuBar from './modules/_MenuBar.es6';
import Drupal from 'drupal';

(function(Drupal) {
  'use strict';

  // The styling for this mobile menu is located in pattern-lab/source/_patterns/03-components/mobile-menu/_mobile-menu.scss.

  Drupal.behaviors.primaryNav = {
    attach(context) {
      const myMenu = new MenuBar(context.querySelector('.menu--submenu'));
      myMenu.init();
    },
  };
})(Drupal);
