import parse from 'html-react-parser';

import { withGlobalWrapper, gsapImport } from '../../../.storybook/decorators';
import twigTemplate from './card.twig';
import data from './card.yml';
import './card.scss';
import './card.es6';
// Importing Tag, TagList and ReadMoreLink to ensure their assets gets loaded
// in Storybook when this story is referenced since Drupal loads them as a library.
import '../tag/tag.stories.jsx';
import '../tag-list/tag-list.stories.jsx';
import '../read-more-link/read-more-link.stories.jsx';

const settings = {
  title: 'Components/Card',
  decorators: [withGlobalWrapper, gsapImport],
};

const Default = {
  render: args => parse(twigTemplate(args)),
  args: { ...data },
};

const FeatureCard = {
  ...Default,
  args: {
    ...Default.args,
    modifier_classes: 'c-card--feature',
  },
};

export default settings;
export { Default, FeatureCard };
