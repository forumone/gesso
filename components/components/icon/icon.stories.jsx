import parse from 'html-react-parser';

import { withGlobalWrapper } from '../../../.storybook/decorators.jsx';
import twigTemplate from './icon.twig';
import globalData from '../../../source/00-config/storybook.global-data.yml';
import data from './icon.yml';
import componentInfo from './icon.component.yml';
import getArgTypesFromComponent from '../../../.storybook/getArgTypesFromComponent.js';
import './icon.source.scss';

const baseArgTypes = getArgTypesFromComponent(componentInfo, {
  hideArgs: globalData,
  hide: ['icon_name', 'image_path', 'is_hidden', 'label'],
});

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
    ...baseArgTypes,
    direction: {
      ...baseArgTypes.direction,
      options: ['up', 'down', 'left', 'right'],
      control: { type: 'select' },
    },
  },
};

const Icon = {
  render: args => parse(twigTemplate(args)),
  args: { ...globalData, ...data },
};

export default settings;
export { Icon };
