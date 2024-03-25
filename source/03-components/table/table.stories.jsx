import parse from 'html-react-parser';

import { withGlobalWrapper } from '../../../.storybook/decorators';
import twigTemplate from './table.twig';
import globalData from '../../00-config/storybook.global-data.yml';
import data from './table.yml';
import './table--sortable.es6';

const settings = {
  title: 'Components/Table',
  decorators: [withGlobalWrapper],
  parameters: {
    controls: {
      include: [
        'is_scrollable',
        'modifier_classes',
        'caption',
      ],
    },
  },
};

const Default = {
  render: args => parse(twigTemplate(args)),
  args: { ...globalData, ...data },
};

const Sortable = {
  ...Default,
  args: {
    ...Default.args,
    is_sortable: true,
  },
};

export default settings;
export { Default, Sortable };
