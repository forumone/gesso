import parse from 'html-react-parser';

import { withGlobalWrapper } from '../../../.storybook/decorators.jsx';
import twigTemplate from './menu-account.twig';
import data from './menu-account.yml';
import componentInfo from './menu-account.component.yml';
import getArgTypesFromComponent from '../../../.storybook/getArgTypesFromComponent.js';

const settings = {
  title: 'Components/Menu/Account Menu',
  decorators: [withGlobalWrapper],
  argTypes: {
    ...getArgTypesFromComponent(componentInfo),
  },
};

const AccountMenu = {
  render: args => parse(twigTemplate(args)),
  args: { ...data },
};

export default settings;
export { AccountMenu };
