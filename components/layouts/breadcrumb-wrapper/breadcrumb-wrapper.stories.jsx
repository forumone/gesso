import React from 'react';
import ReactDOMServer from 'react-dom/server';
import parse from 'html-react-parser';

import twigTemplate from './breadcrumb-wrapper.twig';
import data from './breadcrumb-wrapper.yml';
import ContentPlaceholder from '../../../source/01-global/content-placeholder/content-placeholder';

const settings = {
  title: 'Layouts/Breadcrumb',
};

const BreadcrumbWrapper = {
  render: args => parse(twigTemplate(args)),
  args: {
    breadcrumb_content: ReactDOMServer.renderToStaticMarkup(
      <ContentPlaceholder>Breadcrumb Wrapper Content</ContentPlaceholder>
    ),
    ...data,
  },
};

export default settings;
export { BreadcrumbWrapper };
