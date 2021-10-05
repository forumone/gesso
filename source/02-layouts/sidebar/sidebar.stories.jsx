import React from 'react';

import twigTemplate from './sidebar.twig';
import data from './sidebar.yml';

const settings = {
  title: 'Layouts/Sidebar',
  argTypes: {
    is_demo: {
      table: {
        disable: true
      }
    }
  },
};

const Sidebar = args => (
  <div
    dangerouslySetInnerHTML={{
      __html: twigTemplate({
        ...args,
      }),
    }}
  />
);
Sidebar.args = { ...data };

export default settings;
export { Sidebar };
