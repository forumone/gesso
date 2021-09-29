import React from 'react';

import twigTemplate from './form-item--checkboxes.twig';

const settings = {
  title: 'Components/Form Item/Form Item Checkboxes',
  parameters: {
    controls: { hideNoControlsWarning: true },
  }
};

const FormItemCheckboxes = args => (
  <div
    dangerouslySetInnerHTML={{
      __html: twigTemplate({
        ...args,
      }),
    }}
  />
);
FormItemCheckboxes.args = { };

export default settings;
export { FormItemCheckboxes };
