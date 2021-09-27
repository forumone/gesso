import React from 'react';

import twigTemplate from './headings.twig';

const settings = {
  title: 'Global/Headings',
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
