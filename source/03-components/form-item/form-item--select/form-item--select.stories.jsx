import React from 'react';
import parse from 'html-react-parser';

import twigTemplate from './form-item--select.twig';

const settings = {
  title: 'Components/Form Item/Form Item Select',
  parameters: {
    controls: { hideNoControlsWarning: true },
  }
};

const FormItemSelect = args => (
  parse(twigTemplate({
    ...args,
  }))
);
FormItemSelect.args = { };

export default settings;
export { FormItemSelect };
