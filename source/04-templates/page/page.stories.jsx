import React from 'react';

import twigTemplate from './page.twig';
import data from './page.yml';

const settings = {
  title: 'Templates/Page',
};

const Page = args => (
  <div
    dangerouslySetInnerHTML={{
      __html: twigTemplate({
        ...args,
      }),
    }}
  />
);
Page.args = { ...data };

export default settings;
export { Page };
