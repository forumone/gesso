import React from 'react';

import twigTemplate from './homepage.twig';
import data from './homepage.yml';

const settings = {
  title: 'Templates/Homepage',
};

const Homepage = args => (
  <div
    dangerouslySetInnerHTML={{
      __html: twigTemplate({
        ...args,
      }),
    }}
  />
);
Homepage.args = { ...data };

export default settings;
export { Homepage };
