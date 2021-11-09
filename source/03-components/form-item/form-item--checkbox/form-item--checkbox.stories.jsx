import React from 'react';
import parse from 'html-react-parser';

import twigTemplate from './form-item--checkbox.twig';
import data from './form-item--checkbox.yml';

const settings = {
  title: 'Components/Form Item/Checkbox',
};

const Checkbox = args => (
  parse(twigTemplate({
    ...args,
  }))
);
Checkbox.args = { ...data };

export default settings;
export { Checkbox };
