import React from 'react';

import twigTemplate from './field--list.twig';
import data from './field--list.yml';

const settings = {
  title: 'Components/Field/Field List',
};

const FieldList = args => (
  <div
    dangerouslySetInnerHTML={{
      __html: twigTemplate({
        ...args,
      }),
    }}
  />
);
FieldList.args = { ...data };

export default settings;
export { FieldList };
