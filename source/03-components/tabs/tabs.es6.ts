import Drupal from 'drupal';
import once from 'once';
import Tabs from './modules/Tabs.es6';

Drupal.behaviors.gessoTabs = {
  attach(context) {
    const tabGroups: Element[] = once('gesso-tabs', '.c-tabs', context);

    tabGroups.forEach(tabGroup => {
      const tabs = new Tabs(tabGroup);
      tabs.init();
    });
  },
};
