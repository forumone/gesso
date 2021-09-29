import React from 'react';

import twigTemplate from './landing-page.twig';
import data from './landing-page.yml';

const settings = {
  title: 'Templates/Landing Page',
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
LandingPage.args = { ...data };

export default settings;
export { LandingPage };
