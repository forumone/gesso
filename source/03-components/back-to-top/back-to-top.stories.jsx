import parse from 'html-react-parser';

import twigTemplate from './back-to-top.twig';
import globalData from '../../00-config/storybook.global-data.yml';
import data from './back-to-top.yml';
import './back-to-top.scss';
import './back-to-top.es6';

const settings = {
  title: 'Components/Back To Top',
  decorators: [
    (Story, { args }) => (
      <Story
        args={{ ...args, modifier_classes: 'c-back-to-top--always-visible' }}
      />
    ),
  ],
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
