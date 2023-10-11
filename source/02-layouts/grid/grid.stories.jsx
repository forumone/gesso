import React from 'react'
import ReactDOMServer from 'react-dom/server';
import parse from 'html-react-parser';

import twigTemplate from './grid.twig';
import data from './grid.yml';
import ContentPlaceholder from '../../01-global/content-placeholder/content-placeholder';

const DemoGridContent = ReactDOMServer.renderToStaticMarkup(
  <>
    <ContentPlaceholder>Grid Item 1</ContentPlaceholder>
    <ContentPlaceholder>Grid Item 2</ContentPlaceholder>
    <ContentPlaceholder>Grid Item 3</ContentPlaceholder>
    <ContentPlaceholder>Grid Item 4</ContentPlaceholder>
    <ContentPlaceholder>Grid Item 5</ContentPlaceholder>
    <ContentPlaceholder>Grid Item 6</ContentPlaceholder>
  </>
)

const settings = {
  title: 'Layouts/Grid',
  decorators: [
    (Story, {args}) =>
      <Story args={{
        ...args,
        grid_content: DemoGridContent
      }} />
  ],
};



const Default = args =>
  parse(
    twigTemplate({
      ...args,
    })
  );
Default.args = { ...data };

const TwoColumn = args =>
  parse(
    twigTemplate({
      ...args,
      num_of_cols: '2',
    })
  );
TwoColumn.args = { ...data };

const ThreeColumn = args =>
  parse(
    twigTemplate({
      ...args,
      num_of_cols: '3',
    })
  );
ThreeColumn.args = { ...data };

const FourColumn = args =>
  parse(
    twigTemplate({
      ...args,
      num_of_cols: '4',
    })
  );
FourColumn.args = { ...data };

const SixColumn = args =>
  parse(
    twigTemplate({
      ...args,
      num_of_cols: '6',
    })
  );
SixColumn.args = { ...data };

export default settings;
export { Default, TwoColumn, ThreeColumn, FourColumn, SixColumn };
