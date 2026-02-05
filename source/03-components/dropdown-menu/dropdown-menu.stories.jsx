import parse from 'html-react-parser';

import { withGlobalWrapper } from '../../../.storybook/decorators';
import twigTemplate from './dropdown-menu.twig';
import data from './dropdown-menu.yml';
import buttonData from './dropdown-menu-buttons.yml';
import './dropdown-menu.es6';
import './dropdown-menu.scss';
import '../mobile-menu/mobile-menu.scss';
import '../hamburger-button/hamburger-button.scss';

const settings = {
  title: 'Components/Menu/Dropdown Menu',
  decorators: [withGlobalWrapper],
};

const DropdownMenu = {
  render: args => parse(twigTemplate(args)),
  args: { ...data },
};

const DropdownMenuWithButtons = {
  ...DropdownMenu,
  args: {
    ...buttonData,
  },
};

export default settings;
export { DropdownMenu, DropdownMenuWithButtons };
