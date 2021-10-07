import React from 'react';

import twigTemplate from './page.twig';
import globalData from '../../00-config/storybook.global-data.yml';
import data from './page.yml';

const settings = {
  title: 'Pages/Corey Original/Page',
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
Page.args = { ...globalData, ...data };

export default settings;
export { Page };
