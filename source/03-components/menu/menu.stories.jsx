import parse from 'html-react-parser';

import { withGlobalWrapper } from '../../../.storybook/decorators';
import twigTemplate from './menu.twig';
import data from './menu.yml';

const settings = {
  title: 'Components/Menu/Default',
  decorators: [withGlobalWrapper],
};

const Default = {
  render: args => parse(twigTemplate(args)),
  args: { ...data },
};

export default settings;
export { Default };
