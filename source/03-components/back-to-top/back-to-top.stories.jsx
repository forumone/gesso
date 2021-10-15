import React from 'react';

import twigTemplate from './back-to-top.twig';
import globalData from '../../00-config/storybook.global-data.yml';
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
BackToTop.args = { ...globalData, ...data };

export default settings;
export { BackToTop };
