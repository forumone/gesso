import React from 'react';

import twigTemplate from './medium-date.twig';
import data from './medium-date.yml';

const settings = {
  title: 'Global/Date/Medium Date',
};

const MediumDate = args => (
  <div
    dangerouslySetInnerHTML={{
      __html: twigTemplate({
        ...args,
      }),
    }}
  />
);
MediumDate.args = { ...data };

export default settings;
export { MediumDate };
