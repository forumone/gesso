import parse from 'html-react-parser';

import { withGlobalWrapper } from '../../../.storybook/decorators';
import twigTemplate from './article.twig';
import globalData from '../../00-config/storybook.global-data.yml';
import data from './article.yml';
// Importing components to ensure their assets get loaded in Storybook when they
// get referenced since Drupal loads them as a library.
import '../wysiwyg/wysiwyg.stories.jsx';

const settings = {
  title: 'Components/Article',
  decorators: [withGlobalWrapper],
  parameters: {
    controls: {
      include: [
        'title',
        'show_footer',
        'author_name',
        'date_format',
        'year',
        'month',
        'day',
        'hour',
        'minute',
        'content',
      ],
    },
  },
};

const Article = {
  render: args => parse(twigTemplate(args)),
  args: {
    ...globalData,
    ...data,
  },
};

export default settings;
export { Article };
