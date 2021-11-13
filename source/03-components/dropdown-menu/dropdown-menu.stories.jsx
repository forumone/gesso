import parse from 'html-react-parser';

import twigTemplate from './dropdown-menu.twig';
import data from './dropdown-menu.yml';
import buttonData from './dropdown-menu-buttons.yml';
import './dropdown-menu.es6';
import './dropdown-menu.scss';
import '../mobile-menu/mobile-menu.scss';
import '../hamburger-button/hamburger-button.scss';

const settings = {
  title: 'Components/Menu/Dropdown Menu',
};

const DropdownMenu = args =>
  parse(
    twigTemplate({
      ...args,
    })
  );
DropdownMenu.args = { ...data };

const DropdownMenuWithButtons = args =>
  parse(
    twigTemplate({
      ...args,
    })
  );
DropdownMenuWithButtons.args = { ...buttonData };

export default settings;
export { DropdownMenu, DropdownMenuWithButtons };
