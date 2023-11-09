import parse from 'html-react-parser';

import { withGlobalWrapper } from '../../../.storybook/decorators';
import twigTemplate from './field.twig';
import data from './field.yml';
import listTwigTemplate from './field--list/field--list.twig';
import listData from './field--list/field--list.yml';

const settings = {
  title: 'Components/Field',
  decorators: [withGlobalWrapper],
};

const Default = {
  render: args => parse(twigTemplate(args)),
  args: { ...data },
};

const List = {
  render: args => parse(listTwigTemplate(args)),
  args: { ...listData },
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
