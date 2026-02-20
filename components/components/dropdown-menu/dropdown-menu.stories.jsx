import parse from 'html-react-parser';

import { withGlobalWrapper } from '../../.storybook/decorators.jsx';
import twigTemplate from './dropdown-menu.twig';
import data from './dropdown-menu.yml';
import buttonData from './dropdown-menu-buttons.yml';
import './dropdown-menu.source.js';
import './dropdown-menu.source.scss';
import '../../source/03-components/mobile-menu/mobile-menu.scss';
import '../../source/03-components/hamburger-button/hamburger-button.scss';
import componentInfo from './dropdown-menu.component.yml';
import getArgTypesFromComponent from '../../.storybook/getArgTypesFromComponent.js';

const settings = {
  title: 'Components/Menu/Dropdown Menu',
  decorators: [withGlobalWrapper],
  argTypes: {
    ...getArgTypesFromComponent(componentInfo),
  },
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
