import Twig from 'twig';
import { addDecorator } from '@storybook/react';
import { useEffect } from '@storybook/client-api';
import twigDrupal from 'twig-drupal-filters';
import twigAttributes from 'add-attributes-twig-extension';
import keysort from '../lib/keysort';
import uniqueId from '../lib/uniqueId';
import './stubs/drupal';
import './stubs/once';

import '../dist/css/styles.css';

function setupTwig(twig) {
  twig.cache();
  twigDrupal(twig);
  twigAttributes(twig);
  keysort(twig);
  uniqueId(twig);
  return twig;
}

setupTwig(Twig);

addDecorator(storyFn => {
  useEffect(() => Drupal.attachBehaviors(), []);
  return storyFn();
});

export const parameters = {
  layout: 'fullscreen',
  options: {
    storySort: {
      method: 'alphabetical',
      order: [
        'Global',
        ['Color Palette', '*'],
        'Layouts',
        'Components',
        'Templates',
        'Pages',
      ],
      includeName: true,
    },
  },
};
