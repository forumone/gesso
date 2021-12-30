import parse from 'html-react-parser';

import twigTemplate from './date.twig';
import globalData from '../../00-config/storybook.global-data.yml';
import data from './date.yml';

const settings = {
  title: 'Components/Date',
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
      ]
    }
  }
};

const Date = args => (
  parse(twigTemplate({
    ...args,
  }))
);
Date.args = { ...globalData, ...data };

export default settings;
export { Date };
