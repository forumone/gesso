import Twig from 'twig';
import { useEffect } from 'storybook/preview-api';
import twigDrupal from '@forumone/twig-drupal-filters';
import twigAttributes from '../lib/addAttributesTwigExtension';
import keysort from '../lib/keysort';
import uniqueId from '../lib/uniqueId';
import fieldValue from '../lib/fieldValue';
import subheadingLevel from '../lib/subheadingLevelTwigExtension.js';
import twigCreateAttributes from '../lib/createAttributeTwigExtension';
import assetVersion from '../lib/assetVersion';
import './stubs/drupal';
import './stubs/once';

import '../dist/css/styles.css';
import '../dist/css/utilities.css';
import '../source/01-global/html-elements/01-html/html.es6';

function setupTwig(twig) {
  twig.cache();
  twigDrupal(twig);
  twigAttributes(twig);
  keysort(twig);
  uniqueId(twig);
  twigCreateAttributes(twig);
  fieldValue(twig);
  subheadingLevel(twig);
  assetVersion(twig);
  return twig;
}

setupTwig(Twig);

export const decorators = [
  storyFn => {
    useEffect(() => window.Drupal.attachBehaviors(), []);
    return storyFn();
  },
];

const preview = {
  parameters: {
    controls: {
      disableSaveFromUI: true,
    },
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
  },
};
export default preview;
