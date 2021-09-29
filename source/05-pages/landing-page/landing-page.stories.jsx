import React from 'react';

import twigTemplate from './landing-page.twig';
import globalData from '../../00-config/storybook.global-data.yml';
import data from './landing-page.yml';

const settings = {
  title: 'Pages/Landing Page',
};

const LandingPage = args => (
  <div
    dangerouslySetInnerHTML={{
      __html: twigTemplate({
        ...args,
      }),
    }}
  />
);
LandingPage.args = { ...globalData, ...data };

export default settings;
export { LandingPage };
