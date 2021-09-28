import React from 'react';

import twigTemplate from './short-date.twig';
import data from './short-date.yml';

const settings = {
  title: 'Global/Date/Short Date',
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
ShortDate.args = { ...data };

export default settings;
export { ShortDate };
