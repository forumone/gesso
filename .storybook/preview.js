import Twig from 'twig';
import { useEffect } from 'storybook/preview-api';
import twigDrupal from '@forumone/twig-drupal-filters';
import twigAttributes from '../lib/twig/addAttributes.ts';
import keysort from '../lib/twig/keysort.ts';
import uniqueId from '../lib/twig/uniqueId.ts';
import fieldValue from '../lib/twig/fieldValue.ts';
import subheadingLevel from '../lib/twig/subheadingLevel.ts';
import twigCreateAttributes from '../lib/twig/createAttribute.ts';
import assetVersion from '../lib/twig/assetVersion.ts';
import './stubs/drupal';
import './stubs/once';

import '../dist/css/styles.css';
import '../dist/css/utilities.css';
import '../source/01-global/html-elements/01-html/html.source';

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
