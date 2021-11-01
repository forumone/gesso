import parse from 'html-react-parser';

import twigTemplate from './side-menu.twig';
import data from './side-menu.yml';
import './side-menu.scss';
import './side-menu.es6';

const settings = {
  title: 'Components/Menu/Side Menu',
};

const SideMenu = args =>
  parse(
    twigTemplate({
      ...args,
    })
  );

SideMenu.args = { ...data };

export default settings;
export { SideMenu };
