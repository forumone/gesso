import React from 'react';

import twigTemplate from './icon.twig';
import globalData from '../../00-config/storybook.global-data.yml';
import data from './icon.yml';

const settings = {
  title: 'Components/Icon',
};

const Icon = args => (
  <div
    dangerouslySetInnerHTML={{
      __html: twigTemplate({
        ...args,
      }),
    }}
  />
);
Icon.args = { ...globalData, ...data };

export default settings;
export { Icon };
