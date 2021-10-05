import React from 'react';

import twigTemplate from './form-item--select.twig';

const settings = {
  title: 'Components/Form Item/Form Item Select',
  parameters: {
    controls: { hideNoControlsWarning: true },
  }
};

const FormItemSelect = args => (
  <div
    dangerouslySetInnerHTML={{
      __html: twigTemplate({
        ...args,
      }),
    }}
  />
);
FormItemSelect.args = { };

export default settings;
export { FormItemSelect };
