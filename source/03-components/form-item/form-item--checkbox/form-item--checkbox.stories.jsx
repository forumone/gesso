import React from 'react';
import parse from 'html-react-parser';
import twigTemplate from './form-item--checkbox.twig';
import data from './form-item--checkbox.yml';

const settings = {
  title: 'Components/Form Item/Form Item Checkbox',
};

const FormItemCheckbox = args => (
  parse(twigTemplate({
    ...args,
  }))
);
FormItemCheckbox.args = { ...data };

export default settings;
export { FormItemCheckbox };
