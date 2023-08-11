import parse from 'html-react-parser';

import { withGlobalWrapper } from '../../../.storybook/decorators';
import twigTemplate from './shadows.twig';
import data from '../../00-config/config.design-tokens.yml';
import './shadows.scss';

const settings = {
  title: 'Global/Box Shadows',
  decorators: [withGlobalWrapper],
  argTypes: {
    gesso: {
      table: {
        disable: true,
      },
    },
  },
};

const BoxShadows = args =>
  parse(
    twigTemplate({
      ...args,
    })
  );
BoxShadows.args = { ...data };

export default settings;
export { BoxShadows };
