import React from 'react';

import twigTemplate from './horizontal-rule.twig';

const settings = {
  title: 'Global/HTML Elements/Horizontal Rule',
  parameters: {
    controls: { hideNoControlsWarning: true },
  },
};

const HorizontalRule = () => (
  <div
    dangerouslySetInnerHTML={{
      __html: twigTemplate(),
    }}
  />
);

export default settings;
export { HorizontalRule };
