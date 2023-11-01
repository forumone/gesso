import React from 'react'
import ReactDOMServer from 'react-dom/server';
import parse from 'html-react-parser';

import twigTemplate from './grid.twig';
import data from './grid.yml';
import ContentPlaceholder from '../../01-global/content-placeholder/content-placeholder';

const settings = {
  title: 'Layouts/Grid',
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

const Default = args =>
  parse(
    twigTemplate({
      ...args,
    })
  );
Default.args = {
  grid_content: placeholderContent,
  ...data
};

const TwoColumn = args =>
  parse(
    twigTemplate({
      ...args,
      num_of_cols: '2',
    })
  );
TwoColumn.args = {
  grid_content: placeholderContent,
  ...data
};

const ThreeColumn = args =>
  parse(
    twigTemplate({
      ...args,
      num_of_cols: '3',
    })
  );
ThreeColumn.args = {
  grid_content: placeholderContent,
  ...data
};

const FourColumn = args =>
  parse(
    twigTemplate({
      ...args,
      num_of_cols: '4',
    })
  );
FourColumn.args = {
  grid_content: placeholderContent,
  ...data
};

const SixColumn = args =>
  parse(
    twigTemplate({
      ...args,
      num_of_cols: '6',
    })
  );
SixColumn.args = {
  grid_content: placeholderContent,
  ...data
};

export default settings;
export { Default, TwoColumn, ThreeColumn, FourColumn, SixColumn };
