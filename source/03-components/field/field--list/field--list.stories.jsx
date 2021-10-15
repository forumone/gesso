import React from 'react';
import parse from 'html-react-parser';

import twigTemplate from './field--list.twig';
import data from './field--list.yml';

const settings = {
  title: 'Components/Field/Field List',
};

const FieldList = args => (
  parse(twigTemplate({
    ...args,
  }))
);
FieldList.args = { ...data };

export default settings;
export { FieldList };
