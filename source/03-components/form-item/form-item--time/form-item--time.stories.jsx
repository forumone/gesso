import React from 'react';

import twigTemplate from './form-item--time.twig';

const settings = {
  title: 'Components/Form Item/Form Item Time',
  parameters: {
    controls: { hideNoControlsWarning: true },
  }
};

const FormItemTime = args => (
  <div
    dangerouslySetInnerHTML={{
      __html: twigTemplate({
        ...args,
      }),
    }}
  />
);
FormItemTime.args = { };

export default settings;
export { FormItemTime };
