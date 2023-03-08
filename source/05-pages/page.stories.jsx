import React from 'react';
import parse from 'html-react-parser';

import globalData from '../00-config/storybook.global-data.yml';
import PageWrapper from './page-wrappers/default.jsx';
import twigTemplate from '../04-templates/page/page.twig';

export default {
  title: 'Pages/Page',
  parameters: {
    controls: {
      include: [
        'show_admin_info',
      ]
    }
  }
};

// For an example of customizing the content on a demo page, see Article page.
const pageContent = args => twigTemplate({
  ...args,
  title: 'Page Title',
});

const Page = args => <PageWrapper>{parse(pageContent(args))}</PageWrapper>;
Page.args = {
  ...globalData,
};

export { Page };
