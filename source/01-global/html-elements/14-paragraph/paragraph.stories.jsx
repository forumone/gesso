import React from 'react';

import twigTemplate from './paragraph.twig';

const settings = {
  title: 'Global/Paragraph',
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
