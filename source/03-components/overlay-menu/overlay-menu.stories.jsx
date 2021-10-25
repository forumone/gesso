import React from 'react';

import twigTemplate from './overlay-menu.twig';
import data from './overlay-menu.yml';
import './overlay-menu.scss';
import './overlay-menu';

const settings = {
  title: 'Components/Menu/Overlay Menu',
};

const OverlayMenu = args => (
  <div
    dangerouslySetInnerHTML={{
      __html: twigTemplate({
        ...args,
      }),
    }}
  />
);
OverlayMenu.args = { ...data };

export default settings;
export { OverlayMenu };
