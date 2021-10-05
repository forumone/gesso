import React from 'react';

import twigTemplate from './section.twig';
import data from './section.yml';

const settings = {
  title: 'Layouts/Section',
  argTypes: {
    is_demo: {
      table: {
        disable: true
      }
    }
  },
};

const Section = args => (
  <div
    dangerouslySetInnerHTML={{
      __html: twigTemplate({
        ...args,
      }),
    }}
  />
);
Section.args = { ...data };

export default settings;
export { Section };
