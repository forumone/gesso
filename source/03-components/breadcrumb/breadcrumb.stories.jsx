import React from 'react';

import twigTemplate from './breadcrumb.twig';
import data from './breadcrumb.yml';

const settings = {
  title: 'Components/Breadcrumb',
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
