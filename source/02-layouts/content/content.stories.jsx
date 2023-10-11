import React from 'react'
import ReactDOMServer from 'react-dom/server';
import parse from 'html-react-parser';

import twigTemplate from './content.twig';
import data from './content.yml';
import ContentPlaceholder from '../../01-global/content-placeholder/content-placeholder';

const settings = {
  title: 'Layouts/Content',
  decorators: [
    (Story, {args}) =>
      <Story args={{
        ...args,
        content_content: ReactDOMServer.renderToStaticMarkup(
          <ContentPlaceholder>Content Layout Content</ContentPlaceholder>
        )
      }} />
  ],
};

const Content = args =>
  parse(
    twigTemplate({
      ...args,
    })
  );
Content.args = {
  ...data,
};

export default settings;
export { Content };
