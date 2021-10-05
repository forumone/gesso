import React from 'react';

import twigTemplate from './site-logo.twig';
import globalData from '../../00-config/storybook.global-data.yml';

const settings = {
  title: 'Components/Site Logo',
  parameters: {
    controls: {
      include: ['url', 'site_logo', 'modifier_classes']
    }
  }
};

const SiteLogo = args => (
  <div
    dangerouslySetInnerHTML={{
      __html: twigTemplate({
        ...args,
      }),
    }}
  />
);
SiteLogo.args = { ...globalData };

export default settings;
export { SiteLogo };
