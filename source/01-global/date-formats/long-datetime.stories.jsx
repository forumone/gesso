import parse from 'html-react-parser';

import { withGlobalWrapper } from '../../../.storybook/decorators';
import twigTemplate from './long-datetime.twig';
import globalData from '../../00-config/storybook.global-data.yml';

const settings = {
  title: 'Global/Date/Long Datetime',
  decorators: [withGlobalWrapper],
  parameters: {
    controls: {
      include: ['weekday', 'month', 'day', 'year', 'hour', 'minute'],
    },
  },
};

const LongDatetime = args =>
  parse(
    twigTemplate({
      ...args,
    })
  );
LongDatetime.args = { ...globalData };

export default settings;
export { LongDatetime };
