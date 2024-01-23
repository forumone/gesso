import parse from 'html-react-parser';

import { withGlobalWrapper } from '../../../.storybook/decorators';
import twigTemplate from './typographic-scale.twig';
import data from '../../00-config/config.design-tokens.yml';
import './typographic-scale.scss';

const settings = {
  title: 'Global/Typography/Typographic Scale',
  decorators: [withGlobalWrapper],
  argTypes: {
    gesso: {
      table: {
        disable: true,
      },
    },
  },
};

const TypographicScale = {
  render: args => parse(twigTemplate(args)),
  args: { ...data },
};

export default settings;
export { TypographicScale };
