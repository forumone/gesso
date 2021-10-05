import React from 'react';

import twigTemplate from './button.twig';
import data from './button.yml';

const settings = {
  title: 'Components/Button',
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

const Danger = args => (
  <div
    dangerouslySetInnerHTML={{
      __html: twigTemplate({
        ...args,
        modifier_classes: 'button--danger',
      }),
    }}
  />
);
Danger.args = { ...data };

const Large = args => (
  <div
    dangerouslySetInnerHTML={{
      __html: twigTemplate({
        ...args,
        modifier_classes: 'button--large',
      }),
    }}
  />
);
Large.args = { ...data };

const Secondary = args => (
  <div
    dangerouslySetInnerHTML={{
      __html: twigTemplate({
        ...args,
        modifier_classes: 'button--secondary',
      }),
    }}
  />
);
Secondary.args = { ...data };

const Small = args => (
  <div
    dangerouslySetInnerHTML={{
      __html: twigTemplate({
        ...args,
        modifier_classes: 'button--small',
      }),
    }}
  />
);
Small.args = { ...data };

export default settings;
export { Default, Danger, Large, Secondary, Small };
