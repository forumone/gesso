import React from 'react';
import parse from 'html-react-parser';

import twigTemplate from './field.twig';
import data from './field.yml';

const settings = {
  title: 'Components/Field/Default',
};

const Default = args => (
  parse(twigTemplate({
    ...args,
  }))
);
Default.args = { ...data };

export default settings;
export { Default };
