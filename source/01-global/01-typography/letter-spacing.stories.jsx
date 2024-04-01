import parse from 'html-react-parser';

import { withGlobalWrapper } from '../../../.storybook/decorators';
import twigTemplate from './letter-spacing.twig';
import data from '../../00-config/config.design-tokens.yml';
import './letter-spacing.scss';

const settings = {
  title: 'Global/Typography/Letterspacing',
  decorators: [withGlobalWrapper],
  argTypes: {
    gesso: {
      table: {
        disable: true,
      },
    },
  },
};

const Letterspacing = {
  render: args => parse(twigTemplate(args)),
  args: { ...data },
};

export default settings;
export { Letterspacing };
