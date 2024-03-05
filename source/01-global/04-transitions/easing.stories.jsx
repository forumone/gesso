import parse from 'html-react-parser';

import { withGlobalWrapper } from '../../../.storybook/decorators';
import twigTemplate from './easing.twig';
import data from '../../00-config/config.design-tokens.yml';
import './easing.scss';

const settings = {
  title: 'Global/Easing',
  decorators: [withGlobalWrapper],
  argTypes: {
    gesso: {
      table: {
        disable: true,
      },
    },
  },
};

const Easing = {
  render: args => parse(twigTemplate(args)),
  args: { ...data },
};

export default settings;
export { Easing };
