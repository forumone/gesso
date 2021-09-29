import React from 'react';

import twigTemplate from './back-to-top.twig';
import data from './back-to-top.yml';

const settings = {
  title: 'Components/Back To Top',
};

const BackToTop = args => (
  <div
    dangerouslySetInnerHTML={{
      __html: twigTemplate({
        ...args,
      }),
    }}
  />
);
BackToTop.args = { ...data };

export default settings;
export { BackToTop };
