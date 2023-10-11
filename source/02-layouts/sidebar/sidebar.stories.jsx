import React from 'react'
import ReactDOMServer from 'react-dom/server';
import parse from 'html-react-parser';

import twigTemplate from './sidebar.twig';
import data from './sidebar.yml';
import ContentPlaceholder from '../../01-global/content-placeholder/content-placeholder';

const settings = {
  title: 'Layouts/Sidebar',
};

const Sidebar = args =>
  parse(
    twigTemplate({
      ...args,
    })
  );
Sidebar.args = {
  ...data,
  sidebar_header_content: ReactDOMServer.renderToStaticMarkup(<ContentPlaceholder>Header Content</ContentPlaceholder>),
  sidebar_first_content: ReactDOMServer.renderToStaticMarkup(<ContentPlaceholder>Optional Sidebar Content</ContentPlaceholder>),
  sidebar_main_content: ReactDOMServer.renderToStaticMarkup(<ContentPlaceholder>Main Content</ContentPlaceholder>),
  sidebar_second_content: ReactDOMServer.renderToStaticMarkup(<ContentPlaceholder>Optional Sidebar Content</ContentPlaceholder>),
};

export default settings;
export { Sidebar };
