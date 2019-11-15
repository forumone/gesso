import Drupal from 'drupal';
import MobileMenu from './modules/_MobileMenu.es6';
(function(Drupal) {
  'use strict';

  // The styling for this mobile menu is located in source/_patterns/04-components/mobile-menu/_mobile-menu.scss.

  Drupal.behaviors.mobileMenu = {
    attach() {
      if (!document.body.classList.contains('mobile-menu-processed')) {
        const mobileMenu = new MobileMenu();
        mobileMenu.init();
        document.body.classList.add('mobile-menu-processed');
      }
    },
  };
})(Drupal);
