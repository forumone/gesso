import parse from 'html-react-parser';

import { withGlobalWrapper } from '../../../../.storybook/decorators';
import twigTemplate from './menu--account.twig';
import data from './menu--account.yml';

const settings = {
  title: 'Components/Menu/Account Menu',
  decorators: [withGlobalWrapper],
};

const AccountMenu = args =>
  parse(
    twigTemplate({
      ...args,
    })
  );
AccountMenu.args = { ...data };

export default settings;
export { AccountMenu };
