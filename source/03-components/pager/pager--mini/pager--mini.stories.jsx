import React from 'react';

import twigTemplate from './pager--mini.twig';
import data from './pager--mini.yml';

const settings = {
  title: 'Components/Pager/Mini Pager',
};

const MiniPager = args => (
  <div
    dangerouslySetInnerHTML={{
      __html: twigTemplate({
        ...args,
      }),
    }}
  />
);
MiniPager.args = { ...data };

export default settings;
export { MiniPager };
