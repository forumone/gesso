import parse from 'html-react-parser';

import { withGlobalWrapper } from '../../../.storybook/decorators';
import twigTemplate from './icon.twig';
import globalData from '../../00-config/storybook.global-data.yml';
import data from './icon.yml';

const settings = {
  title: 'Components/Icon',
  decorators: [withGlobalWrapper],
  argTypes: {
    direction: {
      options: ['up', 'down', 'left', 'right'],
      control: { type: 'select' },
    },
  },
  parameters: {
    controls: {
      include: ['modifier_classes', 'direction', 'label'],
    },
  },
};

const Icon = args =>
  parse(
    twigTemplate({
      ...args,
    })
  );
Icon.args = { ...globalData, ...data };

export default settings;
export { Icon };
