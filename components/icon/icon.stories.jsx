import parse from 'html-react-parser';

import { withGlobalWrapper } from '../../.storybook/decorators.jsx';
import twigTemplate from './icon.twig';
import globalData from '../../source/00-config/storybook.global-data.yml';
import data from './icon.yml';
import componentInfo from './icon.component.yml';
import getArgTypesFromComponent from '../../.storybook/getArgTypesFromComponent.js';

const settings = {
  title: 'Components/Icon',
  decorators: [
    (Story, { args }) =>
      globalData.icons.map(icon => (
        <p key={icon}>
          <Story args={{ ...args, icon_name: icon }} />
          &nbsp;&nbsp;{icon}
        </p>
      )),
    withGlobalWrapper,
  ],
  argTypes: {
    ...getArgTypesFromComponent(componentInfo),
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

const Icon = {
  render: args => parse(twigTemplate(args)),
  args: { ...globalData, ...data },
};

export default settings;
export { Icon };
