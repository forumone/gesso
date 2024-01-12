import parse from 'html-react-parser';

import { withGlobalWrapper } from '../../../.storybook/decorators';
import twigTemplate from './date.twig';
import globalData from '../../00-config/storybook.global-data.yml';
import data from './date.yml';

const settings = {
  title: 'Components/Date',
  decorators: [withGlobalWrapper],
  parameters: {
    controls: {
      include: [
        'date_format',
        'date_content',
        'modifier_classes',
        'year',
        'month',
        'weekday',
        'day',
        'hour',
        'minute',
      ],
    },
  },
};

const Date = {
  render: args => parse(twigTemplate(args)),
  args: { ...globalData, ...data },
};

export default settings;
export { Date };
