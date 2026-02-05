import React from 'react';
import ReactDOMServer from 'react-dom/server';
import parse from 'html-react-parser';

import twigTemplate from './grid.twig';
import data from './grid.yml';
import ContentPlaceholder from '../../01-global/content-placeholder/content-placeholder';

const settings = {
  title: 'Layouts/Grid',
  argTypes: {
    num_of_cols: {
      control: 'number',
      min: 1,
      max: 6,
    },
  },
};

const placeholderContent = ReactDOMServer.renderToStaticMarkup(
  <>
    <ContentPlaceholder>Grid Item 1</ContentPlaceholder>
    <ContentPlaceholder>Grid Item 2</ContentPlaceholder>
    <ContentPlaceholder>Grid Item 3</ContentPlaceholder>
    <ContentPlaceholder>Grid Item 4</ContentPlaceholder>
    <ContentPlaceholder>Grid Item 5</ContentPlaceholder>
    <ContentPlaceholder>Grid Item 6</ContentPlaceholder>
  </>
);

const Default = {
  render: args => parse(twigTemplate(args)),
  args: {
    grid_content: placeholderContent,
    ...data,
  },
};

const TwoColumn = {
  ...Default,
  args: {
    ...Default.args,
    num_of_cols: 2,
  },
  parameters: {
    controls: {
      exclude: ['num_of_cols'],
    },
  },
};

const ThreeColumn = {
  ...TwoColumn,
  args: {
    ...TwoColumn.args,
    num_of_cols: 3,
  },
};

const FourColumn = {
  ...ThreeColumn,
  args: {
    ...ThreeColumn.args,
    num_of_cols: 4,
  },
};

const SixColumn = {
  ...FourColumn,
  args: {
    ...FourColumn.args,
    num_of_cols: 6,
  },
};

export default settings;
export { Default, TwoColumn, ThreeColumn, FourColumn, SixColumn };
