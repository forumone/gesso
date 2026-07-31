import React from 'react';
import ReactDOMServer from 'react-dom/server';
import parse from 'html-react-parser';

import { withGlobalWrapper } from '../../../.storybook/decorators';
import twigTemplate from './page.twig';
import globalData from '../../../source/00-config/storybook.global-data.yml';
import ContentPlaceholder from '../../../source/01-global/content-placeholder/content-placeholder';
import { MessagesandTabs } from '../messages-and-tabs/messages-and-tabs.stories.jsx';

const settings = {
  title: 'Templates/Page',
  decorators: [withGlobalWrapper],
  parameters: {
    controls: {
      include: [
        'is_published',
        'show_admin_info',
        'title',
        'show_footer',
        'author',
        'date_format',
        'content',
      ],
    },
  },
};

const Page = {
  render: args => parse(twigTemplate(args)),
  args: {
    ...globalData,
    admin_info: MessagesandTabs.args.admin_info,
    title: 'Page Title',
    show_footer: true,
    content: ReactDOMServer.renderToStaticMarkup(
      <ContentPlaceholder>Page Content</ContentPlaceholder>
    ),
  },
};

export default settings;
export { Page };
