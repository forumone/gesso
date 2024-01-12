import React from 'react';
import ReactDOMServer from 'react-dom/server';
import parse from 'html-react-parser';

import { withGlobalWrapper } from '../../../.storybook/decorators';
import twigTemplate from './landing-page.twig';
import globalData from '../../00-config/storybook.global-data.yml';
import ContentPlaceholder from '../../01-global/content-placeholder/content-placeholder';
// Importing components to ensure their assets get loaded in Storybook when they
// get referenced since Drupal loads them as a library.
import { Default as Message } from '../../03-components/message/message.stories.jsx';

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
    content: ReactDOMServer.renderToStaticMarkup(
      <ContentPlaceholder>Landing Page Content</ContentPlaceholder>
    ),
  },
};

export default settings;
export { LandingPage };
