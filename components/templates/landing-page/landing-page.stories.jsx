import React from 'react';
import ReactDOMServer from 'react-dom/server';
import parse from 'html-react-parser';

import twigTemplate from './landing-page.twig';
import globalData from '../../../source/00-config/storybook.global-data.yml';
import ContentPlaceholder from '../../../source/01-global/content-placeholder/content-placeholder';
import { MessagesandTabs } from '../messages-and-tabs/messages-and-tabs.stories.jsx';
import { withGlobalWrapper } from '../../../.storybook/decorators.jsx';
// Importing components to ensure their assets get loaded in Storybook when they
// get referenced since Drupal loads them as a library.
import '../../components/page-title/page-title.stories.jsx';
import '../../layouts/section/section.stories.jsx';

const settings = {
  title: 'Templates/Landing Page',
  decorators: [withGlobalWrapper],
  parameters: {
    controls: {
      include: ['is_published', 'show_admin_info', 'page_title', 'content'],
    },
  },
};

const LandingPage = {
  render: args => parse(twigTemplate(args)),
  args: {
    ...globalData,
    admin_info: MessagesandTabs.args.admin_info,
    page_title: 'Landing Page Title',
    content: ReactDOMServer.renderToStaticMarkup(
      <ContentPlaceholder>Landing Page Content</ContentPlaceholder>
    ),
  },
};

export default settings;
export { LandingPage };
