import React from 'react';

import twigTemplate from './date.twig';
import globalData from '../../00-config/storybook.global-data.yml';
import data from './date.yml';

const settings = {
  title: 'Components/Date',
  parameters: {
    controls: {
      include: ['format', 'date_content', 'modifier_classes', 'year', 'month', 'weekday', 'day', 'hour', 'minute']
    }
  }
};

const Date = args => (
  <div
    dangerouslySetInnerHTML={{
      __html: twigTemplate({
        ...args,
      }),
    }}
  />
);
Date.args = { ...globalData, ...data };

export default settings;
export { Date };
