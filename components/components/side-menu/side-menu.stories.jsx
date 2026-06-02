import parse from 'html-react-parser';

import twigTemplate from './side-menu.twig';
import data from './side-menu.yml';
import './side-menu.source.scss';
import './side-menu.source.ts';
import '../hamburger-button/hamburger-button.source.scss';
import componentInfo from './side-menu.component.yml';
import getArgTypesFromComponent from '../../../.storybook/getArgTypesFromComponent.js';

const settings = {
  title: 'Components/Menu/Side Menu',
  argTypes: {
    ...getArgTypesFromComponent(componentInfo),
  },
};

const SideMenu = {
  render: args => parse(twigTemplate(args)),
  args: { ...data },
};

export default settings;
export { SideMenu };
