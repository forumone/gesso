import React from 'react';

import twigTemplate from './nav.twig';
import data from './nav.yml';

const settings = {
  title: 'Layouts/Nav',
  argTypes: {
    is_demo: {
      table: {
        disable: true
      }
    }
  },
};

const Nav = args => (
  <div
    dangerouslySetInnerHTML={{
      __html: twigTemplate({
        ...args,
      }),
    }}
  />
);
Nav.args = { ...data };

export default settings;
export { Nav };
