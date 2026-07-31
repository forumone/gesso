import React from 'react';
import ReactDOMServer from 'react-dom/server';
import parse from 'html-react-parser';

import twigTemplate from './content.twig';
import data from './content.yml';
import ContentPlaceholder from '../../../source/01-global/content-placeholder/content-placeholder';
import './content.source.scss';

const settings = {
  title: 'Layouts/Content',
};

const Content = {
  render: args => parse(twigTemplate(args)),
  args: {
    content_content: ReactDOMServer.renderToStaticMarkup(
      <ContentPlaceholder>Content Layout Content</ContentPlaceholder>
    ),
    ...data,
  },
};

export default settings;
export { Content };
