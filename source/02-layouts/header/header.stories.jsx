import React from 'react'
import ReactDOMServer from 'react-dom/server';
import parse from 'html-react-parser';

import twigTemplate from './header.twig';
import data from './header.yml';
import ContentPlaceholder from '../../01-global/content-placeholder/content-placeholder';

const settings = {
  title: 'Layouts/Header',
};

const Header = args =>
  parse(
    twigTemplate({
      ...args,
    })
  );
Header.args = {
  ...data,
  header_content: ReactDOMServer.renderToStaticMarkup(<ContentPlaceholder>Header Layout Content</ContentPlaceholder>)
};

export default settings;
export { Header };
