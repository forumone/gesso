import parse from 'html-react-parser';

import { withGlobalWrapper } from '../../../.storybook/decorators';
import twigTemplate from './short-datetime.twig';
import globalData from '../../00-config/storybook.global-data.yml';

const settings = {
  title: 'Global/Date/Short Datetime',
  decorators: [withGlobalWrapper],
  parameters: {
    controls: {
      include: ['weekday', 'month', 'day', 'year', 'hour', 'minute'],
    },
  },
};

const ShortDatetime = {
  render: args => parse(twigTemplate(args)),
  args: { ...globalData },
};

export default settings;
export { ShortDatetime };
