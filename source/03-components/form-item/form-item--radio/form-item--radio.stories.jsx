import React from 'react';
import parse from 'html-react-parser';

import twigTemplate from './form-item--radio.twig';

const settings = {
  title: 'Components/Form Item/Form Item Radio',
  parameters: {
    controls: { hideNoControlsWarning: true },
  }
};

const FormItemRadio = args => (
  parse(twigTemplate({
    ...args,
  }))
);
FormItemRadio.args = { };

export default settings;
export { FormItemRadio };
