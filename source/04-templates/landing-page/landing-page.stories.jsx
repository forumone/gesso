import React from 'react';
import ReactDOMServer from 'react-dom/server';
import parse from 'html-react-parser';

import { withGlobalWrapper } from '../../../.storybook/decorators';
import twigTemplate from './landing-page.twig';
import globalData from '../../00-config/storybook.global-data.yml';
import ContentPlaceholder from '../../01-global/content-placeholder/content-placeholder';
import { Article } from '../../03-components/article/article.stories.jsx';

const settings = {
  title: 'Templates/Landing Page',
  decorators: [withGlobalWrapper],
  parameters: {
    controls: {
      include: [
        'is_published',
        'page_title',
        'show_admin_info',
        'content',
      ],
    },
  },
};

const LandingPage = {
  render: args => parse(twigTemplate(args)),
  args: {
    ...globalData,
    page_title: 'Landing Page Title',
    admin_info: Article.args.admin_info,
    content: ReactDOMServer.renderToStaticMarkup(
      <ContentPlaceholder>Landing Page Content</ContentPlaceholder>
    ),
  },
};

export default settings;
export { LandingPage };
