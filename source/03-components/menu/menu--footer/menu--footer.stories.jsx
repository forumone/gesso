import parse from 'html-react-parser';

import { withGlobalWrapper } from '../../../../.storybook/decorators';
import twigTemplate from './menu--footer.twig';
import data from './menu--footer.yml';

const settings = {
  title: 'Components/Menu/Footer Menu',
  decorators: [withGlobalWrapper],
};

const FooterMenu = {
  render: args => parse(twigTemplate(args)),
  args: { ...data },
};

export default settings;
export { FooterMenu };
