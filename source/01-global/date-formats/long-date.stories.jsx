import parse from 'html-react-parser';

import { withGlobalWrapper } from '../../../.storybook/decorators';
import twigTemplate from './long-date.twig';
import globalData from '../../00-config/storybook.global-data.yml';

const settings = {
  title: 'Global/Date/Long Date',
  decorators: [withGlobalWrapper],
  parameters: {
    controls: {
      include: ['weekday', 'month', 'day', 'year'],
    },
  },
};

const LongDate = {
  render: args => parse(twigTemplate(args)),
  args: { ...globalData },
};

export default settings;
export { LongDate };
