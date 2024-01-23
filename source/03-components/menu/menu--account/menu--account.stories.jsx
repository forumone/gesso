import parse from 'html-react-parser';

import { withGlobalWrapper } from '../../../../.storybook/decorators';
import twigTemplate from './menu--account.twig';
import data from './menu--account.yml';

const settings = {
  title: 'Components/Menu/Account Menu',
  decorators: [withGlobalWrapper],
};

const AccountMenu = {
  render: args => parse(twigTemplate(args)),
  args: { ...data },
};

export default settings;
export { AccountMenu };
