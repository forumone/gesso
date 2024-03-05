import parse from 'html-react-parser';

import { withGlobalWrapper } from '../../../.storybook/decorators';
import twigTemplate from './short-date.twig';
import globalData from '../../00-config/storybook.global-data.yml';

const settings = {
  title: 'Global/Date/Short Date',
  decorators: [withGlobalWrapper],
  parameters: {
    controls: {
      include: ['month', 'day', 'year'],
    },
  },
};

const ShortDate = {
  render: args => parse(twigTemplate(args)),
  args: { ...globalData },
};

export default settings;
export { ShortDate };
