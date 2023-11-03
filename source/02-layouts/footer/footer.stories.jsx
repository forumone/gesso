import React from 'react';
import ReactDOMServer from 'react-dom/server';
import parse from 'html-react-parser';

import twigTemplate from './footer.twig';
import data from './footer.yml';
import ContentPlaceholder from '../../01-global/content-placeholder/content-placeholder';

const settings = {
  title: 'Layouts/Footer',
};

const Footer = {
  render: args =>
    parse(
      twigTemplate({
        ...args,
      })
    ),
  args: {
    footer_content: ReactDOMServer.renderToStaticMarkup(
      <ContentPlaceholder>Footer Layout Content</ContentPlaceholder>
    ),
    ...data,
  },
};

export default settings;
export { Footer };
