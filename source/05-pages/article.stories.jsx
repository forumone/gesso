import React from 'react';
import ReactDOMServer from 'react-dom/server';

import ArticleTwig from '../04-templates/article/article.twig';
import { wysiwygContent } from '../03-components/content-block/content-block.stories.jsx';
import PageWrapper from './page-wrappers/default.jsx';

export default {
  title: 'Pages/Article',
};

// For an example of customizing the WYSIWYG content on a demo page,
// see Page.
const articleContent = ArticleTwig({
  article_title: 'Look, I Can Take You as Far as Anchorhead',
  article_has_footer: true,
  article_content: ReactDOMServer.renderToStaticMarkup(<>{wysiwygContent()}</>),
});

const Article = () => (
  <PageWrapper>
    <div dangerouslySetInnerHTML={{ __html: articleContent }} />
  </PageWrapper>
);

export { Article };
