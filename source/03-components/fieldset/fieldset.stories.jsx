import React from 'react';
import parse from 'html-react-parser';

import twigTemplate from './fieldset.twig';
import data from './fieldset.yml';

const settings = {
  title: 'Components/Fieldset',
};

const Default = args => (
  parse(twigTemplate({
    ...args,
  }))
);
Default.args = { ...data };

const FieldsetCheckboxes = args => (
  parse(twigTemplate({
    ...args,
    modifier_classes: 'fieldset--checkboxes',
  }))
);
FieldsetCheckboxes.args = { ...data };

const FieldsetRadios = args => (
  parse(twigTemplate({
    ...args,
    modifier_classes: 'fieldset--radios',
  }))
);
FieldsetRadios.args = { ...data };

export default settings;
export { Default, FieldsetCheckboxes, FieldsetRadios };
