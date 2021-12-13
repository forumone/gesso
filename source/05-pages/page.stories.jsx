import React from 'react';
import ReactDOMServer from 'react-dom/server';
import parse from 'html-react-parser';

import PageWrapper from './page-wrappers/default.jsx';
import twigTemplate from '../04-templates/page/page.twig';
import { WYSIWYG } from '../03-components/wysiwyg/wysiwyg.stories.jsx';

export default {
  title: 'Pages/Page',
  parameters: {
    controls: {
      hideNoControlsWarning: true,
    },
  },
};

// For an example of customizing the content block on a demo page,
// see Article page.
const pageContent = twigTemplate({
  title: 'Look, I Can Take You as Far as Anchorhead',
  body: ReactDOMServer.renderToStaticMarkup(<>{ContentBlock(WYSIWYG.args)}</>),
});

const Page = () => <PageWrapper>{parse(pageContent)}</PageWrapper>;

export { Page };
