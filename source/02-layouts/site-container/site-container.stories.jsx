import React from 'react';

import twigTemplate from './site-container.twig';
import data from './site-container.yml';

const settings = {
  title: 'Layouts/Site Container',
  argTypes: {
    is_demo: {
      table: {
        disable: true
      }
    }
  },
};

const SiteContainer = args => (
  <div
    dangerouslySetInnerHTML={{
      __html: twigTemplate({
        ...args,
      }),
    }}
  />
);
SiteContainer.args = { ...data };

export default settings;
export { SiteContainer };
