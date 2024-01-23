import parse from 'html-react-parser';

import { withGlobalWrapper } from '../../../.storybook/decorators';
import twigTemplate from './medium-date.twig';
import globalData from '../../00-config/storybook.global-data.yml';

const settings = {
  title: 'Global/Date/Medium Date',
  decorators: [withGlobalWrapper],
  parameters: {
    controls: {
      include: ['month', 'day', 'year'],
    },
  },
};

const MediumDate = {
  render: args => parse(twigTemplate(args)),
  args: { ...globalData },
};

export default settings;
export { MediumDate };
