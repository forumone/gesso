import React from 'react';
import parse from 'html-react-parser';

import twigTemplate from './form-item--textfield.twig';

const settings = {
  title: 'Components/Form Item/Form Item Text Field',
  parameters: {
    controls: { hideNoControlsWarning: true },
  }
};

const FormItemTextField = args => (
  parse(twigTemplate({
    ...args,
  }))
);
FormItemTextField.args = { };

export default settings;
export { FormItemTextField };
