import Drupal from 'drupal';
import setScrollbarProperty from '../../../06-utility/_setScrollbarProperty.es6';

Drupal.behaviors.setScrollbarProperty = {
  attach() {
    setScrollbarProperty();
  },
};
