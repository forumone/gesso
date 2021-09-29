import React from 'react';

import twigTemplate from './field.twig';
import data from './field.yml';

const settings = {
  title: 'Components/Field/Default',
};

const Default = args => (
  <div
    dangerouslySetInnerHTML={{
      __html: twigTemplate({
        ...args,
      }),
    }}
  />
);
Default.args = { ...data };

export default settings;
export { Default };
