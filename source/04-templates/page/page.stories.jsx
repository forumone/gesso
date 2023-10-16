import React from 'react'
import ReactDOMServer from 'react-dom/server';
import parse from 'html-react-parser';

import { withGlobalWrapper } from '../../../.storybook/decorators';
import twigTemplate from './page.twig';
import globalData from '../../00-config/storybook.global-data.yml';
import ContentPlaceholder from '../../01-global/content-placeholder/content-placeholder';

const settings = {
  title: 'Templates/Page',
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

const Page = args => parse(twigTemplate(args));
Page.args = {
  ...globalData,
  title: 'Page Title',
  show_footer: true,
  content: ReactDOMServer.renderToStaticMarkup(
    <ContentPlaceholder>Page Content</ContentPlaceholder>
  )
};

export default settings;
export { Page };
