import React from 'react';

import twigTemplate from './blockquote.twig';
import data from './blockquote.yml';

const settings = {
  title: 'Global/HTML Elements/Blockquote',
  parameters: {
    controls: { hideNoControlsWarning: true },
  },
};

const Blockquote = () => (
  <div
    dangerouslySetInnerHTML={{
      __html: twigTemplate({
        ...data
      }),
    }}
  />
);

export default settings;
export { Blockquote };
