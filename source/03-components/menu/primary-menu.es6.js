import Drupal from 'drupal';
import MenuBar from './modules/MenuBar.es6';

Drupal.behaviors.primaryNav = {
  attach(context) {
    const menuNode = context.querySelector('.menu--main');
    if (menuNode) {
      const myMenu = new MenuBar(menuNode);
      myMenu.init();
    }
  },
};
