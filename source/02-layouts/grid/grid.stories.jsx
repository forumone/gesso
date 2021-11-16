import parse from 'html-react-parser';

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
  parse(twigTemplate({
    ...args,
  }))
);
Default.args = { ...data };

const TwoColumn = args => (
  parse(twigTemplate({
    ...args,
    num_of_cols: '2',
  }))
);
TwoColumn.args = { ...data };

const ThreeColumn = args => (
  parse(twigTemplate({
    ...args,
    num_of_cols: '3',
  }))
);
ThreeColumn.args = { ...data };

const FourColumn = args => (
  parse(twigTemplate({
    ...args,
    num_of_cols: '4',
  }))
);
FourColumn.args = { ...data };

const SixColumn = args => (
  parse(twigTemplate({
    ...args,
    num_of_cols: '6',
  }))
);
SixColumn.args = { ...data };

export default settings;
export { Default, TwoColumn, ThreeColumn, FourColumn, SixColumn };
