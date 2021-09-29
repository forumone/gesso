import React from 'react';

import twigTemplate from './tabs.twig';
import data from './tabs.yml';

const settings = {
  title: 'Components/Tabs',
};

const Tabs = args => (
  <div
    dangerouslySetInnerHTML={{
      __html: twigTemplate({
        ...args,
      }),
    }}
  />
);
Tabs.args = { ...data };

export default settings;
export { Tabs };
