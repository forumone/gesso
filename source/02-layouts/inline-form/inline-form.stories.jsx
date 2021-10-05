import React from 'react';

import twigTemplate from './inline-form.twig';
import data from './inline-form.yml';

const settings = {
  title: 'Layouts/Inline Form',
  argTypes: {
    is_demo: {
      table: {
        disable: true
      }
    }
  },
};

const InlineForm = args => (
  <div
    dangerouslySetInnerHTML={{
      __html: twigTemplate({
        ...args,
      }),
    }}
  />
);
InlineForm.args = { ...data };

export default settings;
export { InlineForm };
