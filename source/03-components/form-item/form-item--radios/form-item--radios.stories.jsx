import React from 'react';

import twigTemplate from './form-item--radios.twig';

const settings = {
  title: 'Components/Form Item/Form Item Radios',
  parameters: {
    controls: { hideNoControlsWarning: true },
  }
};

const FormItemRadios = args => (
  <div
    dangerouslySetInnerHTML={{
      __html: twigTemplate({
        ...args,
      }),
    }}
  />
);
FormItemRadios.args = { };

export default settings;
export { FormItemRadios };
