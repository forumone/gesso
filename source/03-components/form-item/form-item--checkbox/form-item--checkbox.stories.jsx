import React from 'react';

import twigTemplate from './form-item--checkbox.twig';
import data from './form-item--checkbox.yml';

const settings = {
  title: 'Components/Form Item/Form Item Checkbox',
};

const FormItemCheckbox = args => (
  <div
    dangerouslySetInnerHTML={{
      __html: twigTemplate({
        ...args,
      }),
    }}
  />
);
FormItemCheckbox.args = { ...data };

export default settings;
export { FormItemCheckbox };
