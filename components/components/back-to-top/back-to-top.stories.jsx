import parse from 'html-react-parser';

import twigTemplate from './back-to-top.twig';
import globalData from '../../../source/00-config/storybook.global-data.yml';
import data from './back-to-top.yml';
import './back-to-top.source.scss';
import './back-to-top.source';
import componentInfo from './back-to-top.component.yml';
import getArgTypesFromComponent from '../../../.storybook/getArgTypesFromComponent.js';

const settings = {
  title: 'Components/Back To Top',
  decorators: [
    (Story, { args }) => (
      <Story
        args={{ ...args, modifier_classes: 'c-back-to-top--always-visible' }}
      />
    ),
  ],
  argTypes: {
    ...getArgTypesFromComponent(componentInfo),
  },
  parameters: {
    controls: {
      include: ['text', 'top_element'],
    },
  },
};

const BackToTop = {
  render: args => parse(twigTemplate(args)),
  args: { ...globalData, ...data },
};

export default settings;
export { BackToTop };
