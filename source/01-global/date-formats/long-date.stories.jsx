import parse from 'html-react-parser';

import twigTemplate from './long-date.twig';
import globalData from '../../00-config/storybook.global-data.yml';

const settings = {
  title: 'Global/Date/Long Date',
  parameters: {
    controls: {
      include: ['weekday', 'month', 'day', 'year']
    }
  }
};

const LongDate = args => (
  parse(twigTemplate({
    ...args,
  }))
);
LongDate.args = { ...globalData };

export default settings;
export { LongDate };
