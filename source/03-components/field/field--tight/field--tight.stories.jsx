import React from 'react';
import parse from 'html-react-parser';

import twigTemplate from './field--tight.twig';
import data from './field--tight.yml';

const settings = {
  title: 'Components/Field/Field Tight',
};

const FieldTight = args => (
  parse(twigTemplate({
    ...args,
  }))
);
FieldTight.args = { ...data };

export default settings;
export { FieldTight };
