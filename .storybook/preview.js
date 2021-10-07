import Twig from 'twig';
import { addDecorator } from '@storybook/react';
import { useEffect } from '@storybook/client-api';
import twigDrupal from 'twig-drupal-filters';
import twigAttributes from 'add-attributes-twig-extension';

import '../css/styles.css';
import './_drupal.js';

function setupTwig(twig) {
  twig.cache();
  twigDrupal(twig);
  twigAttributes(twig);
  return twig;
}

setupTwig(Twig);

addDecorator(storyFn => {
  useEffect(() => Drupal.attachBehaviors(), []);
  return storyFn();
});
