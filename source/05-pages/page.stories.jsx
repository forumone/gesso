import React from 'react';
import ReactDOMServer from 'react-dom/server';
import parse from 'html-react-parser';

import globalData from '../00-config/storybook.global-data.yml';
import PageWrapper from './page-wrappers/default.jsx';
import { Page as Template } from '../04-templates/page/page.stories.jsx';

export default {
  title: 'Pages/Page',
  parameters: {
    controls: {
      include: ['is_published', 'show_admin_info'],
    },
  },
};

// For an example of customizing the content on a demo page, see Article page.
const pageContent = args =>
  ReactDOMServer.renderToStaticMarkup(
    Template.render({
      ...args,
      admin_info: Template.args.admin_info,
      title: 'Page Title',
    })
  );

const Page = {
  render: args => <PageWrapper>{parse(pageContent(args))}</PageWrapper>,
  args: { ...globalData },
};

export { Page };
