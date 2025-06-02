import Twig from 'twig';
import { useEffect } from '@storybook/preview-api';
import twigDrupal from '@forumone/twig-drupal-filters';
import twigAttributes from '../lib/addAttributesTwigExtension';
import keysort from '../lib/keysort';
import cleanUniqueId from '../lib/cleanUniqueId';
import fieldValue from '../lib/fieldValue';
import subheadingLevel from '../lib/subheadingLevelTwigExtension.js';
import twigCreateAttributes from '../lib/createAttributeTwigExtension';
import './stubs/drupal';
import './stubs/once';

import '../dist/css/styles.css';
import '../source/01-global/html-elements/00-universal/universal.es6';
import '../source/01-global/html-elements/01-html/html.es6';

function setupTwig(twig) {
  twig.cache();
  twigDrupal(twig);
  twigAttributes(twig);
  keysort(twig);
  cleanUniqueId(twig);
  twigCreateAttributes(twig);
  fieldValue(twig);
  subheadingLevel(twig);
  return twig;
}

setupTwig(Twig);

const addThemeWrapper = (Story, context) => {
  return (
    <div
      className={context.globals.theme}
      style={{
        backgroundColor: 'var(--background-color)',
        color: 'var(--text-color)',
        display: 'flow-root',
        minHeight: '100vh',
      }}
    >
      <Story />
    </div>
  );
};

export const decorators = [
  storyFn => {
    useEffect(() => Drupal.attachBehaviors(), []);
    return storyFn();
  },
  addThemeWrapper,
];

const preview = {
  parameters: {
    layout: 'fullscreen',
    options: {
      storySort: {
        method: 'alphabetical',
        order: [
          'Global',
          ['Color', 'Typography', '*'],
          'Layouts',
          'Components',
          'Templates',
          'Pages',
        ],
        includeName: true,
      },
    },
  },
  globalTypes: {
    theme: {
      description: 'Global theme for components',
      defaultValue: 'default',
      toolbar: {
        title: 'Theme',
        icon: 'paintbrush',
        items: [
          { value: 'theme-default', title: 'Default' },
          { value: 'theme-gray-6', title: 'Dark Gray' },
        ],
        dynamicTitle: true,
      },
    },
  },
};
export default preview;
