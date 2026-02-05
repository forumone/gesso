import parse from 'html-react-parser';

import { withGlobalWrapper } from '../../../.storybook/decorators';
import twigTemplate from './line-height.twig';
import data from '../../00-config/config.design-tokens.yml';
import './line-height.scss';

const settings = {
  title: 'Global/Typography/Line Height',
  decorators: [withGlobalWrapper],
  argTypes: {
    gesso: {
      table: {
        disable: true,
      },
    },
  },
};

const LineHeight = {
  render: args => parse(twigTemplate(args)),
  args: { ...data },
};

export default settings;
export { LineHeight };
