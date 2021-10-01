import React from 'react';

import twigTemplate from './duration.twig';
import data from '../../00-config/config.design-tokens.yml';
import './duration.scss';

const settings = {
  title: 'Global/Duration',
  argTypes: {
    gesso: {
      table: {
        disable: true
      }
    }
  }
};

const Duration = args => (
  <div
    dangerouslySetInnerHTML={{
      __html: twigTemplate({
        ...args,
      }),
    }}
  />
);
Duration.args = { ...data };

export default settings;
export { Duration };
