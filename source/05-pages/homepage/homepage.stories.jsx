import React from 'react';

import twigTemplate from './homepage.twig';
import globalData from '../../00-config/storybook.global-data.yml';
import data from './homepage.yml';

const settings = {
  title: 'Pages/Homepage',
};

const Homepage = args => (
  <div
    dangerouslySetInnerHTML={{
      __html: twigTemplate({
        ...args,
      }),
    }}
  />
);
Homepage.args = { ...globalData, ...data };

export default settings;
export { Homepage };
