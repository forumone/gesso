import parse from 'html-react-parser';

import { withGlobalWrapper } from '../../../.storybook/decorators.jsx';
import twigTemplate from './card.twig';
import data from './card.yml';
import './card.source.scss';
// Importing Tag, TagList and ReadMoreLink to ensure their assets gets loaded
// in Storybook when this story is referenced since Drupal loads them as a library.
import '../tag/tag.stories.jsx';
import '../tag-list/tag-list.stories.jsx';
import '../read-more-link/read-more-link.stories.jsx';
import componentInfo from './card.component.yml';
import getArgTypesFromComponent from '../../../.storybook/getArgTypesFromComponent.js';

const settings = {
  title: 'Components/Card',
  decorators: [withGlobalWrapper],
  argTypes: {
    ...getArgTypesFromComponent(componentInfo),
  },
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
