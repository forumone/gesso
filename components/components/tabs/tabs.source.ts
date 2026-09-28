import Drupal from 'drupal';
import once from 'once';
import Tabs from './modules/_Tabs.es6.js';

Drupal.behaviors.gessoTabs = {
  attach(context) {
    const tabGroups: Element[] = once('gesso-tabs', '.c-tabs', context);

    tabGroups.forEach(tabGroup => {
      const tabs = new Tabs(tabGroup);
      tabs.init();
    });
  },
};
