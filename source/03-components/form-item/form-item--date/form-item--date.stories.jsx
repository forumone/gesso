import React from 'react';
import parse from 'html-react-parser';

import twigTemplate from './form-item--date.twig';

const settings = {
  title: 'Components/Form Item/Form Item Date',
  parameters: {
    controls: { hideNoControlsWarning: true },
  }
};

const FormItemDate = args => (
  parse(twigTemplate({
    ...args,
  }))
);
FormItemDate.args = { };

export default settings;
export { FormItemDate };
