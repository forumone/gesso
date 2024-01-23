import React from 'react';
import ReactDOMServer from 'react-dom/server';
import parse from 'html-react-parser';

import twigTemplate from './breadcrumb.twig';
import data from './breadcrumb.yml';
import ContentPlaceholder from '../../01-global/content-placeholder/content-placeholder';

const settings = {
  title: 'Layouts/Breadcrumb',
};

const Breadcrumb = {
  render: args => parse(twigTemplate(args)),
  args: {
    breadcrumb_content: ReactDOMServer.renderToStaticMarkup(
      <ContentPlaceholder>Breadcrumb Layout Content</ContentPlaceholder>
    ),
    ...data,
  },
};

export default settings;
export { Breadcrumb };
