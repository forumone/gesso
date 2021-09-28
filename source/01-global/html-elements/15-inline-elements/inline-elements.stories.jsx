import React from 'react';

import twigTemplate from './inline-elements.twig';

const settings = {
  title: 'Global/Inline Elements',
  parameters: {
    controls: { hideNoControlsWarning: true },
  },
};

const InlineElements = () => (
  <div
    dangerouslySetInnerHTML={{
      __html: twigTemplate(),
    }}
  />
);

export default settings;
export { InlineElements };
