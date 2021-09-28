import React from 'react';

import twigTemplate from './header.twig';
import data from './header.yml';

const settings = {
  title: 'Layouts/Header',
  argTypes: {
    is_demo: {
      table: {
        disable: true
      }
    }
  },
};

const Header = args => (
  <div
    dangerouslySetInnerHTML={{
      __html: twigTemplate({
        ...args,
      }),
    }}
  />
);
Header.args = { ...data };

export default settings;
export { Header };
