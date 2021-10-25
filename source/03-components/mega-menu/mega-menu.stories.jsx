import parse from 'html-react-parser';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import twigTemplate from './mega-menu.twig';
import globalData from '../../00-config/storybook.global-data.yml';
import data from './mega-menu.yml';
import { ImageTeaser } from '../image-teaser/image-teaser.stories.jsx';
import './mega-menu.scss';
import './mega-menu.es6';
import '../mobile-menu/mobile-menu.scss';
import '../hamburger-button/hamburger-button.scss';

const settings = {
  title: 'Components/Menu/Mega Menu',
};

const menuItems = data.items.map(item => ({
  ...item,
  featured: `${ReactDOMServer.renderToStaticMarkup(
    <>{ImageTeaser(ImageTeaser.args)}</>
  )}`,
}));

const MegaMenu = args => (
  <>
    {parse(twigTemplate(args))}
    <div style={{ height: '100vh' }} />
  </>
);
MegaMenu.args = {
  ...globalData,
  ...data,
  items: menuItems,
};

export default settings;
export { MegaMenu };
