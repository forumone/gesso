import parse from 'html-react-parser';

import { withGlobalWrapper } from '../../../.storybook/decorators';
import twigTemplate from './color.twig';
import data from '../../00-config/config.design-tokens.yml';
import './color.scss';

const settings = {
  title: 'Global/Color Palette',
  decorators: [withGlobalWrapper],
  argTypes: {
    gesso: {
      table: {
        disable: true,
      },
    },
  },
};

const ColorPalette = {
  render: args => parse(twigTemplate(args)),
  args: { ...data },
};

export default settings;
export { ColorPalette };
