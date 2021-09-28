import React from 'react';

import twigTemplate from './hero-image.twig';
import data from './hero-image.yml';

const settings = {
  title: 'Global/Images/Hero Image',
};

const HeroImage = args => (
  <div
    dangerouslySetInnerHTML={{
      __html: twigTemplate({
        ...args,
      }),
    }}
  />
);
HeroImage.args = { ...data };

export default settings;
export { HeroImage };
