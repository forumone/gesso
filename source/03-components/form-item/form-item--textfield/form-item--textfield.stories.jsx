import React from 'react';

import twigTemplate from './form-item--textfield.twig';

const settings = {
  title: 'Components/Form Item/Form Item Text Field',
  parameters: {
    controls: { hideNoControlsWarning: true },
  }
};

const FormItemTextField = args => (
  <div
    dangerouslySetInnerHTML={{
      __html: twigTemplate({
        ...args,
      }),
    }}
  />
);
FormItemTextField.args = { };

export default settings;
export { FormItemTextField };
