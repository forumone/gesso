import React from 'react';

import twigTemplate from './breadcrumb.twig';
import data from './breadcrumb.yml';

const settings = {
  title: 'Layouts/Breadcrumb',
  argTypes: {
    is_demo: {
      table: {
        disable: true
      }
    }
  },
};

const Breadcrumb = args => (
  <div
    dangerouslySetInnerHTML={{
      __html: twigTemplate({
        ...args,
      }),
    }}
  />
);
Breadcrumb.args = { ...data };

export default settings;
export { Breadcrumb };
