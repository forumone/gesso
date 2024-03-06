import React from 'react';
import ReactDOMServer from 'react-dom/server';
import parse from 'html-react-parser';

import { withGlobalWrapper } from '../../../.storybook/decorators';
import twigTemplate from './page.twig';
import globalData from '../../00-config/storybook.global-data.yml';
import ContentPlaceholder from '../../01-global/content-placeholder/content-placeholder';
import { Article } from '../../03-components/article/article.stories.jsx';

const settings = {
  title: 'Templates/Page',
  decorators: [withGlobalWrapper],
  parameters: {
    controls: {
      include: [
        'is_published',
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

const Page = {
  render: args => parse(twigTemplate(args)),
  args: {
    ...globalData,
    title: 'Page Title',
    admin_info: Article.args.admin_info,
    show_footer: true,
    content: ReactDOMServer.renderToStaticMarkup(
      <ContentPlaceholder>Page Content</ContentPlaceholder>
    ),
  },
};

export default settings;
export { Page };
