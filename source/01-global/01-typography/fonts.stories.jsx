import parse from 'html-react-parser';

import { withGlobalWrapper } from '../../../.storybook/decorators';
import twigTemplate from './fonts.twig';
import data from '../../00-config/config.design-tokens.yml';
import './fonts.scss';

const settings = {
  title: 'Global/Typography/Fonts',
  decorators: [withGlobalWrapper],
  argTypes: {
    gesso: {
      table: {
        disable: true,
      },
    },
  },
};

const Fonts = { render: args => parse(twigTemplate(args)), args: { ...data } };

export default settings;
export { Fonts };
