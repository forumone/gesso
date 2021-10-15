import React from 'react';
import parse from 'html-react-parser';

import twigTemplate from './field--no-separator.twig';
import data from './field--no-separator.yml';

const settings = {
  title: 'Components/Field/Field No Separator',
};

const FieldNoSeparator = args => (
  parse(twigTemplate({
    ...args,
  }))
);
FieldNoSeparator.args = { ...data };

export default settings;
export { FieldNoSeparator };
