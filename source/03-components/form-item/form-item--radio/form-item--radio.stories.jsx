import React from 'react';

import twigTemplate from './form-item--radio.twig';

const settings = {
  title: 'Components/Form Item/Form Item Radio',
  parameters: {
    controls: { hideNoControlsWarning: true },
  }
};

const FormItemRadio = args => (
  <div
    dangerouslySetInnerHTML={{
      __html: twigTemplate({
        ...args,
      }),
    }}
  />
);
FormItemRadio.args = { };

export default settings;
export { FormItemRadio };
