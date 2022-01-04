import parse from 'html-react-parser';

import twigTemplate from './field.twig';
import data from './field.yml';
import listTwigTemplate from './field--list/field--list.twig';
import listData from './field--list/field--list.yml';

const settings = {
  title: 'Components/Field',
};

const Default = args => (
  parse(twigTemplate({
    ...args,
  }))
);
Default.args = { ...data };

const List = args => (
  parse(listTwigTemplate({
    ...args,
  }))
);
List.args = { ...listData };

const Tight = args => (
  parse(twigTemplate({
    ...args,
    modifier_classes: 'c-field--tight',
  }))
);
Tight.args = { ...data };

export default settings;
export { Default, List, Tight };
