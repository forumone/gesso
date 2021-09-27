import React from 'react';

import twigTemplate from './horizontal-rule.twig';

const settings = {
  title: 'Global/Horizontal Rule',
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
