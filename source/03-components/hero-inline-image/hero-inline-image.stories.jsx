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

const Left = args => (
  <div
    dangerouslySetInnerHTML={{
      __html: twigTemplate({
        ...args,
        modifier_classes: 'hero-inline-image--left',
      }),
    }}
  />
);
Left.args = { ...data };

const Right = args => (
  <div
    dangerouslySetInnerHTML={{
      __html: twigTemplate({
        ...args,
        modifier_classes: 'hero-inline-image--right',
      }),
    }}
  />
);
Right.args = { ...data };

export default settings;
export { Default, Left, Right };
