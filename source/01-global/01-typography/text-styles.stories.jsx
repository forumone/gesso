import React from 'react';

import twigTemplate from './text-styles.twig';
import data from '../../00-config/config.design-tokens.yml';
import './text-styles.scss';

const settings = {
  title: 'Global/Text Styles',
  argTypes: {
    gesso: {
      table: {
        disable: true
      }
    }
  }
};

const TextStyles = args => (
  <div
    dangerouslySetInnerHTML={{
      __html: twigTemplate({
        ...args,
      }),
    }}
  />
);
TextStyles.args = { ...data };

export default settings;
export { TextStyles };
