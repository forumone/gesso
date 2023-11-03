import React from 'react';
import ReactDOMServer from 'react-dom/server';
import parse from 'html-react-parser';

import twigTemplate from './nav.twig';
import data from './nav.yml';
import ContentPlaceholder from '../../01-global/content-placeholder/content-placeholder';

const settings = {
  title: 'Layouts/Nav',
};

const Nav = {
  render: args =>
    parse(
      twigTemplate({
        ...args,
      })
    ),
  args: {
    nav_content: ReactDOMServer.renderToStaticMarkup(
      <ContentPlaceholder>Nav Layout Content</ContentPlaceholder>
    ),
    ...data,
  },
};

export default settings;
export { Nav };
