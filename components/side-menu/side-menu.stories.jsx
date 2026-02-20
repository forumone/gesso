import parse from 'html-react-parser';

import twigTemplate from './side-menu.twig';
import data from './side-menu.yml';
import './side-menu.source.scss';
import './side-menu.source.ts';
import '../../source/03-components/hamburger-button/hamburger-button.scss';

const settings = {
  title: 'Components/Menu/Side Menu',
};

const SideMenu = {
  render: args => parse(twigTemplate(args)),
  args: { ...data },
};

export default settings;
export { SideMenu };
