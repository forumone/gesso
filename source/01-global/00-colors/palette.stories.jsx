import parse from 'html-react-parser';

import { withGlobalWrapper } from '../../../.storybook/decorators';
import twigTemplate from './palette.twig';
import data from '../../00-config/config.design-tokens.yml';
import './palette.scss';

const settings = {
  title: 'Global/Color',
  decorators: [withGlobalWrapper],
  argTypes: {
    gesso: {
      table: {
        disable: true,
      },
    },
  },
};

const Palette = {
  render: args => parse(twigTemplate(args)),
  args: { ...data },
};

export default settings;
export { Palette };
