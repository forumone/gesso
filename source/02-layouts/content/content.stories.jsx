import React from 'react';

import twigTemplate from './content.twig';
import data from './content.yml';

const settings = {
  title: 'Layouts/Content',
  argTypes: {
    is_demo: {
      table: {
        disable: true
      }
    }
  },
};

const Content = args => (
  <div
    dangerouslySetInnerHTML={{
      __html: twigTemplate({
        ...args,
      }),
    }}
  />
);
Content.args = { ...data };

export default settings;
export { Content };
