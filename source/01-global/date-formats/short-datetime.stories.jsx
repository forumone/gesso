import React from 'react';

import twigTemplate from './short-datetime.twig';
import globalData from '../../00-config/storybook.global-data.yml';

const settings = {
  title: 'Global/Date/Short Datetime',
  parameters: {
    controls: {
      include: ['weekday', 'month', 'day', 'year', 'hour', 'minute']
    }
  }
};

const ShortDatetime = args => (
  <div
    dangerouslySetInnerHTML={{
      __html: twigTemplate({
        ...args,
      }),
    }}
  />
);
ShortDatetime.args = { ...globalData };

export default settings;
export { ShortDatetime };
