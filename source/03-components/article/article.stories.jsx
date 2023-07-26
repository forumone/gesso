import parse from 'html-react-parser';

import { withGlobalWrapper } from '../../../.storybook/decorators';
import twigTemplate from './article.twig';
import globalData from '../../00-config/storybook.global-data.yml';
import data from './article.yml';
// Importing Message to ensure its assets gets loaded in Storybook when this
// story is referenced since Drupal loads them as a library.
import { Default as Message } from '../message/message.stories.jsx';

const settings = {
  title: 'Components/Article',
  decorators: [withGlobalWrapper],
  parameters: {
    controls: {
      include: [
        'title',
        'show_admin_info',
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

const Article = args => parse(twigTemplate(args));
Article.args = { ...globalData, ...data };

export default settings;
export { Article };
