import React from 'react';
import parse from 'html-react-parser';

import twigTemplate from './menu--main.twig';
import data from './menu--main.yml';
import './mobile-menu.es6';
import './primary-menu.es6';

const settings = {
  title: 'Components/Menu/Main Menu',
};

const MainMenu = args => (
  parse(twigTemplate({
    ...args,
  }))
);
MainMenu.args = { ...data };

export default settings;
export { MainMenu };
