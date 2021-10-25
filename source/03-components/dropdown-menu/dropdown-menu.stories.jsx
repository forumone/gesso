import parse from 'html-react-parser';

import twigTemplate from './dropdown-menu.twig';
import data from './dropdown-menu.yml';
import './dropdown-menu.es6';
import "./dropdown-menu.scss";

const settings = {
  title: 'Components/Menu/Dropdown Menu',
};

const DropdownMenu = args => (
  parse(twigTemplate({
    ...args,
  }))
);
DropdownMenu.args = { ...data };

export default settings;
export { DropdownMenu };
