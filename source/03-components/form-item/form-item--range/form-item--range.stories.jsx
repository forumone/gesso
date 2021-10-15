import React from 'react';
import parse from 'html-react-parser';

import twigTemplate from './form-item--range.twig';

const settings = {
  title: 'Components/Form Item/Form Item Range',
  parameters: {
    controls: { hideNoControlsWarning: true },
  }
};

const FormItemRange = args => (
  parse(twigTemplate({
    ...args,
  }))
);
FormItemRange.args = { };

export default settings;
export { FormItemRange };
