import React from 'react';

import twigTemplate from './headings.twig';

const settings = {
  title: 'Global/Headings',
  parameters: {
    controls: { hideNoControlsWarning: true },
  },
};

const Headings = () => (
  <div
    dangerouslySetInnerHTML={{
      __html: twigTemplate(),
    }}
  />
);

export default settings;
export { Headings };
