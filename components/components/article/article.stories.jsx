import parse from 'html-react-parser';

import { withGlobalWrapper } from '../../../.storybook/decorators.jsx';
import twigTemplate from './article.twig';
import globalData from '../../../source/00-config/storybook.global-data.yml';
import data from './article.yml';
import './article.source.scss';
import componentInfo from './article.component.yml';
// Importing components to ensure their assets get loaded in Storybook when they
// get referenced since Drupal loads them as a library.
import '../wysiwyg/wysiwyg.stories.jsx';
import getArgTypesFromComponent from '../../../.storybook/getArgTypesFromComponent.js';

const settings = {
  title: 'Components/Article',
  decorators: [withGlobalWrapper],
  argTypes: {
    ...getArgTypesFromComponent(componentInfo),
  },
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
    article_content: globalData.content,
  },
};

export default settings;
export { Article };
