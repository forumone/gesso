import React from 'react';

import twigTemplate from './pager.twig';
import data from './pager.yml';

const settings = {
  title: 'Components/Pager/Default',
};

const Default = args => (
  <div
    dangerouslySetInnerHTML={{
      __html: twigTemplate({
        ...args,
      }),
    }}
  />
);
Default.args = { ...data };

export default settings;
export { Default };
