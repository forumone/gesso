import Drupal from 'drupal';
import MobileMenu from './modules/_MobileMenu.es6';

Drupal.behaviors.mobileMenu = {
  attach() {
    if (!document.body.classList.contains('mobile-menu-processed')) {
      const mobileMenu = new MobileMenu();
      mobileMenu.init();
      document.body.classList.add('mobile-menu-processed');
    }
  },
};
