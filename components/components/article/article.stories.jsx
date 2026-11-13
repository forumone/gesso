import parse from 'html-react-parser';

import { withGlobalWrapper } from '../../../.storybook/decorators.jsx';
import twigTemplate from './article.twig';
import globalData from '../../../source/00-config/storybook.global-data.yml';
import data from './article.yml';
import componentInfo from './article.component.yml';
// Importing components to ensure their assets get loaded in Storybook when they
// get referenced since Drupal loads them as a library.
import '../wysiwyg/wysiwyg.stories.jsx';
import '../page-title/page-title.stories.jsx';
import '../author/author.stories.jsx';
import '../date/date.stories.jsx';
import '../list/list.stories.jsx';
import './article.source.scss';
import getArgTypesFromComponent from '../../../.storybook/getArgTypesFromComponent.js';

const settings = {
  title: 'Components/Article',
  decorators: [withGlobalWrapper],
  argTypes: {
    ...getArgTypesFromComponent(componentInfo, {
      hideArgs: globalData,
      hide: ['title_prefix', 'title_suffix', 'rdf_metadata'],
      show: ['year', 'month', 'day'],
    }),
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
