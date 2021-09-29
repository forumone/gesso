import React from 'react';

import twigTemplate from './teaser.twig';
import data from './teaser.yml';

const settings = {
  title: 'Components/Teaser',
};

const Teaser = args => (
  <div
    dangerouslySetInnerHTML={{
      __html: twigTemplate({
        ...args,
      }),
    }}
  />
);
Teaser.args = { ...data };

export default settings;
export { Teaser };
