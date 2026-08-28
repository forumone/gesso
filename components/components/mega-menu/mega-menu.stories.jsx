import parse from 'html-react-parser';
import React from 'react';
import ReactDOMServer from 'react-dom/server';

import twigTemplate from './mega-menu.twig';
import globalData from '../../../source/00-config/storybook.global-data.yml';
import data from './mega-menu.yml';
import { ImageTeaser } from '../image-teaser/image-teaser.stories.jsx';
import './mega-menu.source.scss';
import './mega-menu.source.ts';
import '../mobile-menu/mobile-menu.source.scss';
import '../hamburger-button/hamburger-button.source.scss';
// Importing components to ensure their assets get loaded in Storybook when they
// get referenced since Drupal loads them as a library.
import '../icon/icon.stories.jsx';
import componentInfo from './mega-menu.component.yml';
import getArgTypesFromComponent from '../../../.storybook/getArgTypesFromComponent.js';

const settings = {
  title: 'Components/Menu/Mega Menu',
  decorators: [
    Story => (
      <>
        <Story />
        <div style={{ blockSize: '100vh' }} />
      </>
    ),
  ],
  argTypes: {
    ...getArgTypesFromComponent(componentInfo),
  },
  parameters: {
    controls: {
      exclude: [...Object.keys(globalData)],
    },
  },
};

const menuItems = data.items.map(item => ({
  ...item,
  featured: `${ReactDOMServer.renderToStaticMarkup(
    ImageTeaser.render(ImageTeaser.args)
  )}`,
}));

const MegaMenu = {
  render: args => parse(twigTemplate(args)),
  args: {
    ...globalData,
    ...data,
    items: menuItems,
  },
};

export default settings;
export { MegaMenu };
