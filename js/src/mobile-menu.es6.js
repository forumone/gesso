import Drupal from 'drupal';
import MobileMenu from './classes/MobileMenu';
(function(Drupal) {
  'use strict';

  // The styling for this mobile menu is located in pattern-lab/source/_patterns/03-components/mobile-menu/_mobile-menu.scss.

  Drupal.behaviors.mobileMenu = {
    attach(context) {
      const mobileMenu = new MobileMenu();
      mobileMenu.init();
    },
  };
})(Drupal);
