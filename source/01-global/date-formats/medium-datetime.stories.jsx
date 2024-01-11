import parse from 'html-react-parser';

import { withGlobalWrapper } from '../../../.storybook/decorators';
import twigTemplate from './medium-datetime.twig';
import globalData from '../../00-config/storybook.global-data.yml';

const settings = {
  title: 'Global/Date/Medium Datetime',
  decorators: [withGlobalWrapper],
  parameters: {
    controls: {
      include: ['month', 'day', 'year', 'hour', 'minute'],
    },
  },
};

const MediumDatetime = {
  render: args => parse(twigTemplate(args)),
  args: { ...globalData },
};

export default settings;
export { MediumDatetime };
