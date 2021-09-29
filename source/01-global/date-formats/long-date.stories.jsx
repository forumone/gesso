import React from 'react';

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
  <div
    dangerouslySetInnerHTML={{
      __html: twigTemplate({
        ...args,
      }),
    }}
  />
);
LongDate.args = { ...globalData };

export default settings;
export { LongDate };
