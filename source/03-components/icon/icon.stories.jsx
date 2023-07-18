import parse from 'html-react-parser';

import twigTemplate from './icon.twig';
import globalData from '../../00-config/storybook.global-data.yml';
import data from './icon.yml';

const settings = {
  title: 'Components/Icon',
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
