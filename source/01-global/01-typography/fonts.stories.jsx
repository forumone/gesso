import React from 'react';

import twigTemplate from './fonts.twig';
import data from '../../00-config/config.design-tokens.yml';
import './fonts.scss';

const settings = {
  title: 'Global/Fonts',
  argTypes: {
    gesso: {
      table: {
        disable: true
      }
    }
  }
};

const Fonts = args => (
  <div
    dangerouslySetInnerHTML={{
      __html: twigTemplate({
        ...args,
      }),
    }}
  />
);
Fonts.args = { ...data };

export default settings;
export { Fonts };
