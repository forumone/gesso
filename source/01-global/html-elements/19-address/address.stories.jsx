import React from 'react';

import twigTemplate from './address.twig';

const settings = {
  title: 'Global/Address',
  parameters: {
    controls: { hideNoControlsWarning: true },
  },
};

const Address = () => (
  <div
    dangerouslySetInnerHTML={{
      __html: twigTemplate(),
    }}
  />
);

export default settings;
export { Address };
