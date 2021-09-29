import React from 'react';

import twigTemplate from './field--tight.twig';
import data from './field--tight.yml';

const settings = {
  title: 'Components/Field/Field Tight',
};

const FieldTight = args => (
  <div
    dangerouslySetInnerHTML={{
      __html: twigTemplate({
        ...args,
      }),
    }}
  />
);
FieldTight.args = { ...data };

export default settings;
export { FieldTight };
