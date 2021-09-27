import React from 'react';

import twigTemplate from './preformatted-text.twig';

const settings = {
  title: 'Global/Preformatted Text',
};

const PreformattedText = () => (
  <div
    dangerouslySetInnerHTML={{
      __html: twigTemplate(),
    }}
  />
);

export default settings;
export { PreformattedText };
