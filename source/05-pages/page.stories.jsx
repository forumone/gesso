import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { Markup } from 'interweave';
import PageWrapper from './page-wrappers/default.jsx';
import twigTemplate from '../04-templates/page/page.twig';
import { wysiwygContent } from '../03-components/content-block/content-block.stories.jsx';

export default {
  title: 'Pages/Page',
};

// For an example of customizing the WYSIWYG content on a demo page,
// see Article page.
const pageContent = twigTemplate({
  page_title: 'Look, I Can Take You as Far as Anchorhead',
  page_content: ReactDOMServer.renderToStaticMarkup(<>{wysiwygContent()}</>),
});

const Page = () => (
  <PageWrapper>
    <Markup
      noWrap={true}
      content={pageContent}
    />
  </PageWrapper>
);

export { Page };
