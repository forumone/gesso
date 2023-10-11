import React from 'react'
import ReactDOMServer from 'react-dom/server';
import parse from 'html-react-parser';

import twigTemplate from './footer.twig';
import data from './footer.yml';
import ContentPlaceholder from '../../01-global/content-placeholder/content-placeholder';

const settings = {
  title: 'Layouts/Footer',
  decorators: [
    (Story, {args}) =>
      <Story args={{
        ...args,
        footer_content: ReactDOMServer.renderToStaticMarkup(
          <ContentPlaceholder>Footer Layout Content</ContentPlaceholder>
        )
      }} />
  ],
};

const Footer = args =>
  parse(
    twigTemplate({
      ...args,
    })
  );
Footer.args = { ...data };

export default settings;
export { Footer };
