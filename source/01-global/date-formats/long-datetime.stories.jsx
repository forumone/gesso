import React from 'react';

import twigTemplate from './long-datetime.twig';
import data from './long-datetime.yml';

const settings = {
  title: 'Global/Date/Long Datetime',
};

const LongDatetime = args => (
  <div
    dangerouslySetInnerHTML={{
      __html: twigTemplate({
        ...args,
      }),
    }}
  />
);
LongDatetime.args = { ...data };

export default settings;
export { LongDatetime };
