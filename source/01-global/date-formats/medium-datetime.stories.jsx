import React from 'react';

import twigTemplate from './medium-datetime.twig';
import data from './medium-datetime.yml';

const settings = {
  title: 'Global/Date/Medium Datetime',
};

const MediumDatetime = args => (
  <div
    dangerouslySetInnerHTML={{
      __html: twigTemplate({
        ...args,
      }),
    }}
  />
);
MediumDatetime.args = { ...data };

export default settings;
export { MediumDatetime };
