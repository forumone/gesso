import React from 'react';
import parse from 'html-react-parser';

import twigTemplate from './form-item--radios.twig';

const settings = {
  title: 'Components/Form Item/Form Item Radios',
  parameters: {
    controls: { hideNoControlsWarning: true },
  }
};

const FormItemRadios = args => (
  parse(twigTemplate({
    ...args,
  }))
);
FormItemRadios.args = { };

export default settings;
export { FormItemRadios };
