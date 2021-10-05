import React from 'react';

import twigTemplate from './skiplinks.twig';
import data from './skiplinks.yml';

const settings = {
  title: 'Components/Skiplinks',
};

const Skiplinks = args => (
  <div
    dangerouslySetInnerHTML={{
      __html: twigTemplate({
        ...args,
      }),
    }}
  />
);
Skiplinks.args = { ...data };

export default settings;
export { Skiplinks };
