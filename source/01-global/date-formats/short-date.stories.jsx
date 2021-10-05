import React from 'react';

import twigTemplate from './short-date.twig';
import globalData from '../../00-config/storybook.global-data.yml';

const settings = {
  title: 'Global/Date/Short Date',
  parameters: {
    controls: {
      include: ['month', 'day', 'year']
    }
  }
};

const ShortDate = args => (
  <div
    dangerouslySetInnerHTML={{
      __html: twigTemplate({
        ...args,
      }),
    }}
  />
);
ShortDate.args = { ...globalData };

export default settings;
export { ShortDate };
