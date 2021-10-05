import React from 'react';

import twigTemplate from './easing.twig';
import data from '../../00-config/config.design-tokens.yml';
import './easing.scss';

const settings = {
  title: 'Global/Easing',
  argTypes: {
    gesso: {
      table: {
        disable: true
      }
    }
  }
};

const Easing = args => (
  <div
    dangerouslySetInnerHTML={{
      __html: twigTemplate({
        ...args,
      }),
    }}
  />
);
Easing.args = { ...data };

export default settings;
export { Easing };
