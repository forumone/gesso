import React from 'react';

import twigTemplate from './form-item--date.twig';

const settings = {
  title: 'Components/Form Item/Form Item Date',
  parameters: {
    controls: { hideNoControlsWarning: true },
  }
};

const FormItemDate = args => (
  <div
    dangerouslySetInnerHTML={{
      __html: twigTemplate({
        ...args,
      }),
    }}
  />
);
FormItemDate.args = { };

export default settings;
export { FormItemDate };
