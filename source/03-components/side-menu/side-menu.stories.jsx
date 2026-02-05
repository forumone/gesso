import parse from 'html-react-parser';

import twigTemplate from './side-menu.twig';
import data from './side-menu.yml';
import './side-menu.scss';
import './side-menu.es6';
import '../hamburger-button/hamburger-button.scss';

const settings = {
  title: 'Components/Menu/Side Menu',
};

const SideMenu = {
  render: args => parse(twigTemplate(args)),
  args: { ...data },
};

export default settings;
export { SideMenu };
