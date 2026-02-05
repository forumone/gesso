import React from 'react';
import ReactDOMServer from 'react-dom/server';
import parse from 'html-react-parser';

import twigTemplate from './sidebar.twig';
import data from './sidebar.yml';
import ContentPlaceholder from '../../01-global/content-placeholder/content-placeholder';

const settings = {
  title: 'Layouts/Sidebar',
  argTypes: {
    sidebar_header_content: {
      options: ['Show', 'Hide'],
      mapping: {
        Show: ReactDOMServer.renderToStaticMarkup(<ContentPlaceholder>Header Content</ContentPlaceholder>),
        Hide: false,
      },
      control: {
        type: 'select',
      },
    },
    sidebar_first_content: {
      options: ['Show', 'Hide'],
      mapping: {
        Show: ReactDOMServer.renderToStaticMarkup(<ContentPlaceholder>Optional Sidebar Content</ContentPlaceholder>),
        Hide: false,
      },
      control: {
        type: 'select',
      },
    },
    sidebar_main_content: {
      options: ['Show', 'Hide'],
      mapping: {
        Show: ReactDOMServer.renderToStaticMarkup(<ContentPlaceholder>Main Content</ContentPlaceholder>),
        Hide: false,
      },
      control: {
        type: 'select',
      },
    },
    sidebar_second_content: {
      options: ['Show', 'Hide'],
      mapping: {
        Show: ReactDOMServer.renderToStaticMarkup(<ContentPlaceholder>Optional Sidebar Content</ContentPlaceholder>),
        Hide: false,
      },
      control: {
        type: 'select',
      },
    },
  },
};

const Sidebar = {
  render: args => parse(twigTemplate(args)),
  args: {
    sidebar_header_content: 'Show',
    sidebar_first_content: 'Show',
    sidebar_main_content: 'Show',
    sidebar_second_content: 'Show',
    ...data,
  },
};

export default settings;
export { Sidebar };
