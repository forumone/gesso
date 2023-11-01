import React from 'react'
import ReactDOMServer from 'react-dom/server';
import parse from 'html-react-parser';

import twigTemplate from './region.twig';
import data from './region.yml';
import ContentPlaceholder from '../../01-global/content-placeholder/content-placeholder';

const settings = {
  title: 'Layouts/Region',
};

const Region = args =>
  parse(
    twigTemplate({
      ...args,
    })
  );
Region.args = {
  region_content: ReactDOMServer.renderToStaticMarkup(
    <ContentPlaceholder>Region Layout Content</ContentPlaceholder>
  ),
  ...data
};

export default settings;
export { Region };
