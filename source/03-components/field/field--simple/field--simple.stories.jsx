import React from 'react';

import twigTemplate from './field--simple.twig';
import data from './field--simple.yml';

const settings = {
  title: 'Components/Field/Field Simple',
};

const FieldSimple = args => (
  <div
    dangerouslySetInnerHTML={{
      __html: twigTemplate({
        ...args,
      }),
    }}
  />
);
FieldSimple.args = { ...data };

export default settings;
export { FieldSimple };
