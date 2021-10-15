import React from 'react';
import parse from 'html-react-parser';

import twigTemplate from './form-item--checkboxes.twig';

const settings = {
  title: 'Components/Form Item/Form Item Checkboxes',
  parameters: {
    controls: { hideNoControlsWarning: true },
  }
};

const FormItemCheckboxes = args => (
  parse(twigTemplate({
    ...args,
  }))
);
FormItemCheckboxes.args = { };

export default settings;
export { FormItemCheckboxes };
