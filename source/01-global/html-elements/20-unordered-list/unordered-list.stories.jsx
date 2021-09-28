import React from 'react';

import twigTemplate from './unordered-list.twig';

const settings = {
  title: 'Global/Unordered List',
  parameters: {
    controls: { hideNoControlsWarning: true },
  },
};

const UnorderedList = () => (
  <div
    dangerouslySetInnerHTML={{
      __html: twigTemplate(),
    }}
  />
);

export default settings;
export { UnorderedList };
