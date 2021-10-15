import React from 'react';
import parse from 'html-react-parser';

import twigTemplate from './field--simple.twig';
import data from './field--simple.yml';

const settings = {
  title: 'Components/Field/Field Simple',
};

const FieldSimple = args => (
  parse(twigTemplate({
    ...args,
  }))
);
FieldSimple.args = { ...data };

export default settings;
export { FieldSimple };
