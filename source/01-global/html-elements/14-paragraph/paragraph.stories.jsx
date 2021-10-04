import React from 'react';

import twigTemplate from './paragraph.twig';

const settings = {
  title: 'Global/HTML Elements/Paragraph',
  parameters: {
    controls: { hideNoControlsWarning: true },
  },
};

const Paragraph = () => (
  <div
    dangerouslySetInnerHTML={{
      __html: twigTemplate(),
    }}
  />
);

export default settings;
export { Paragraph };
