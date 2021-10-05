import React from 'react';

import twigTemplate from './fieldset.twig';
import data from './fieldset.yml';

const settings = {
  title: 'Components/Fieldset',
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

const FieldsetCheckboxes = args => (
  <div
    dangerouslySetInnerHTML={{
      __html: twigTemplate({
        ...args,
        modifier_classes: 'fieldset--checkboxes',
      }),
    }}
  />
);
FieldsetCheckboxes.args = { ...data };

const FieldsetRadios = args => (
  <div
    dangerouslySetInnerHTML={{
      __html: twigTemplate({
        ...args,
        modifier_classes: 'fieldset--radios',
      }),
    }}
  />
);
FieldsetRadios.args = { ...data };

export default settings;
export { Default, FieldsetCheckboxes, FieldsetRadios };
