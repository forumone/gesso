import parse from 'html-react-parser';

import twigTemplate from './list.twig';
import data from './list.yml';

const settings = {
  title: 'Components/List',
};

const Default = args => (
  parse(twigTemplate({
    ...args,
  }))
);
Default.args = { ...data };

const Border = args => (
  parse(twigTemplate({
    ...args,
    modifier_classes: 'list--border',
  }))
);
Border.args = { ...data };

const Clean = args => (
  parse(twigTemplate({
    ...args,
    modifier_classes: 'list--clean',
  }))
);
Clean.args = { ...data };

const Column = args => (
  parse(twigTemplate({
    ...args,
    modifier_classes: 'list--column',
  }))
);
Column.args = { ...data };

const Inline = args => (
  parse(twigTemplate({
    ...args,
    modifier_classes: 'list--inline',
  }))
);
Inline.args = { ...data };

const Pipeline = args => (
  parse(twigTemplate({
    ...args,
    modifier_classes: 'list--pipeline',
  }))
);
Pipeline.args = { ...data };

export default settings;
export { Default, Border, Clean, Column, Inline, Pipeline };
