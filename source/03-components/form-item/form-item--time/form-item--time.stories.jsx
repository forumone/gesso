import React from 'react';
import parse from 'html-react-parser';

import twigTemplate from './form-item--time.twig';

const settings = {
  title: 'Components/Form Item/Form Item Time',
  parameters: {
    controls: { hideNoControlsWarning: true },
  }
};

const FormItemTime = args => (
  parse(twigTemplate({
    ...args,
  }))
);
FormItemTime.args = { };

export default settings;
export { FormItemTime };
