import React from 'react';

import twigTemplate from './space.twig';
import data from '../../00-config/config.design-tokens.yml';
import './space.scss';

const settings = {
  title: 'Global/Spacing',
  argTypes: {
    gesso: {
      table: {
        disable: true
      }
    }
  }
};

const Spacing = args => (
  <div
    dangerouslySetInnerHTML={{
      __html: twigTemplate({
        ...args,
      }),
    }}
  />
);
Spacing.args = { ...data };

export default settings;
export { Spacing };
