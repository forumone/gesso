import parse from 'html-react-parser';

import { withGlobalWrapper } from '../../../.storybook/decorators';
import twigTemplate from './field.twig';
import data from './field.yml';

const settings = {
  title: 'Components/Field',
  decorators: [withGlobalWrapper],
};

const Default = {
  render: args => parse(twigTemplate(args)),
  args: { ...data },
};

const List = {
  ...Default,
  args: {
    ...Default.args,
    modifier_classes: 'c-field--list',
    field_items_wrapper_tag: 'ul',
    display_item_tag: true,
    field_item_tag: 'li',
    show_separator: false,
  },
};

const Tight = {
  ...Default,
  args: {
    ...Default.args,
    modifier_classes: 'c-field--tight',
  },
};

export default settings;
export { Default, List, Tight };
