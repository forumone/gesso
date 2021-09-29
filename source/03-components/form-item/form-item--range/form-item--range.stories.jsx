import React from 'react';

import twigTemplate from './form-item--range.twig';

const settings = {
  title: 'Components/Form Item/Form Item Range',
  parameters: {
    controls: { hideNoControlsWarning: true },
  }
};

const FormItemRange = args => (
  <div
    dangerouslySetInnerHTML={{
      __html: twigTemplate({
        ...args,
      }),
    }}
  />
);
FormItemRange.args = { };

export default settings;
export { FormItemRange };
