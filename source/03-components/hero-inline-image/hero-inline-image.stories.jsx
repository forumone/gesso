import React from 'react';

import twigTemplate from './hero-inline-image.twig';
import data from './hero-inline-image.yml';
import './hero-inline-image.scss';

const settings = {
  title: 'Components/Hero/Hero with Inline Image',
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

const Left = () => (
  <div
    dangerouslySetInnerHTML={{
      __html: twigTemplate({
        ...data,
        modifier_classes: 'hero-inline-image--left',
      }),
    }}
  />
);

const Right = () => (
  <div
    dangerouslySetInnerHTML={{
      __html: twigTemplate({
        ...data,
        modifier_classes: 'hero-inline-image--right',
      }),
    }}
  />
);

export default settings;
export { Default, Left, Right };
