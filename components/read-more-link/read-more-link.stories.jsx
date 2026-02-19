import parse from 'html-react-parser';

import { withGlobalWrapper } from '../../.storybook/decorators.jsx';
import twigTemplate from './read-more-link.twig';
import globalData from '../../source/00-config/storybook.global-data.yml';
import data from './read-more-link.yml';
import './read-more-link.source.scss';
// Importing IconLink to ensure its assets gets loaded in Storybook when this
// story is referenced since Drupal loads them as a library.
import '../../components/icon-link/icon-link.stories.jsx';

const settings = {
  title: 'Components/Read More Link',
  decorators: [withGlobalWrapper],
  parameters: {
    controls: {
      include: [
        'modifier_classes',
        'url',
        'title',
        'label',
        'description_prefix',
        'hide_description',
      ],
    },
  },
};

const ReadMoreLink = {
  render: args => parse(twigTemplate(args)),
  args: { ...globalData, ...data },
};

export default settings;
export { ReadMoreLink };
