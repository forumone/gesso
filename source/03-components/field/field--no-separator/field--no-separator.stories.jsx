import React from 'react';

import twigTemplate from './field--no-separator.twig';
import data from './field--no-separator.yml';

const settings = {
  title: 'Components/Field/Field No Separator',
};

const FieldNoSeparator = args => (
  <div
    dangerouslySetInnerHTML={{
      __html: twigTemplate({
        ...args,
      }),
    }}
  />
);
FieldNoSeparator.args = { ...data };

export default settings;
export { FieldNoSeparator };
