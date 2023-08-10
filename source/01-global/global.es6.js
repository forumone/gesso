import Drupal from 'drupal';
import setJSClass from '../../../06-utility/_js.es6';

Drupal.behaviors.setJSCLass = {
  attach() {
    setJSClass();
  },
};
