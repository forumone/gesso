import { DropdownMenu } from '../dropdown-menu/dropdown-menu.stories.jsx';
import './mobile-menu.scss';
import '../hamburger-button/hamburger-button.scss';
import './mobile-menu.es6';

const settings = {
  title: 'Components/Menu/Mobile Menu',
};

const MobileMenu = args => DropdownMenu(args);
MobileMenu.args = DropdownMenu.args;

export default settings;
export { MobileMenu };
