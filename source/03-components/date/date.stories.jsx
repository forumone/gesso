import React from 'react';

import twigTemplate from './date.twig';
import data from './date.yml';

const settings = {
  title: 'Components/Date',
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
Date.args = { ...data };

export default settings;
export { Date };
