import React from 'react';

import twigTemplate from './long-date.twig';
import data from './long-date.yml';

const settings = {
  title: 'Global/Date/Long Date',
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
LongDate.args = { ...data };

export default settings;
export { LongDate };
