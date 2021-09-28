import React from 'react';

import twigTemplate from './table.twig';

const settings = {
  title: 'Global/Table',
  parameters: {
    controls: { hideNoControlsWarning: true },
  },
};

const Default = () => (
  <div
    dangerouslySetInnerHTML={{
      __html: twigTemplate(),
    }}
  />
);

export default settings;
export { Default };
