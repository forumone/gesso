import React from 'react';

import twigTemplate from './grid.twig';
import data from './grid.yml';

const settings = {
  title: 'Layouts/Grid',
  argTypes: {
    is_demo: {
      table: {
        disable: true
      }
    }
  },
};

const Default = args => (
  <div
    dangerouslySetInnerHTML={{
      __html: twigTemplate({
        ...args,
      }),
    }}
  />
);
Default.args = { ...data };

const TwoColumn = args => (
  <div
    dangerouslySetInnerHTML={{
      __html: twigTemplate({
        ...args,
        num_of_cols: '2',
      }),
    }}
  />
);
TwoColumn.args = { ...data };

const ThreeColumn = args => (
  <div
    dangerouslySetInnerHTML={{
      __html: twigTemplate({
        ...args,
        num_of_cols: '3',
      }),
    }}
  />
);
ThreeColumn.args = { ...data };

const FourColumn = args => (
  <div
    dangerouslySetInnerHTML={{
      __html: twigTemplate({
        ...args,
        num_of_cols: '4',
      }),
    }}
  />
);
FourColumn.args = { ...data };

const SixColumn = args => (
  <div
    dangerouslySetInnerHTML={{
      __html: twigTemplate({
        ...args,
        num_of_cols: '6',
      }),
    }}
  />
);
SixColumn.args = { ...data };

export default settings;
export { Default, TwoColumn, ThreeColumn, FourColumn, SixColumn };
