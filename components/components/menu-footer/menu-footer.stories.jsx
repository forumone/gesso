import parse from 'html-react-parser';

import { withGlobalWrapper } from '../../../.storybook/decorators.jsx';
import twigTemplate from './menu-footer.twig';
import data from './menu-footer.yml';
import componentInfo from './menu-footer.component.yml';
import getArgTypesFromComponent from '../../../.storybook/getArgTypesFromComponent.js';
import './menu-footer.source.scss';
// Importing components to ensure their assets get loaded in Storybook when they
// get referenced since Drupal loads them as a library.
import '../menu/menu.stories.jsx';

const settings = {
  title: 'Components/Menu/Footer Menu',
  decorators: [withGlobalWrapper],
  argTypes: {
    ...getArgTypesFromComponent(componentInfo),
  },
};

const FooterMenu = {
  render: args => parse(twigTemplate(args)),
  args: { ...data },
};

export default settings;
export { FooterMenu };
