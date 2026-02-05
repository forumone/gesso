import Drupal from 'drupal';

Drupal.behaviors.setJSCLass = {
  attach() {
    document.documentElement.classList.remove('no-js');
    document.documentElement.classList.add('js');
  },
};
