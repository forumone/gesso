import React from 'react';

import twigTemplate from './short-datetime.twig';
import data from './short-datetime.yml';

const settings = {
  title: 'Global/Date/Short Datetime',
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
ShortDatetime.args = { ...data };

export default settings;
export { ShortDatetime };
