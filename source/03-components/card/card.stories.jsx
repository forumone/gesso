import parse from 'html-react-parser';

import { withGlobalWrapper } from '../../../.storybook/decorators';
import twigTemplate from './card.twig';
import data from './card.yml';
import './card.scss';
// Importing Tag, TagList and ReadMoreLink to ensure their assets gets loaded
// in Storybook when this story is referenced since Drupal loads them as a library.
import { Tag } from '../tag/tag.stories.jsx';
import { TagList } from '../tag-list/tag-list.stories.jsx';
import { ReadMoreLink } from '../read-more-link/read-more-link.stories.jsx';

const settings = {
  title: 'Components/Card',
  decorators: [withGlobalWrapper],
};

const Default = {
  render: args =>
    parse(
      twigTemplate({
        ...args,
      })
    ),
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
