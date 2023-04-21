import parse from 'html-react-parser';

import twigTemplate from './icon-link.twig';
import data from './icon-link.yml';
import globalData from '../../00-config/storybook.global-data.yml';
import './icon-link.scss';

const settings = {
  title: 'Components/Icon Link',
  argTypes: {
    icon_name: {
      options: [
        'angle',
        'angle-double',
        'close',
        'rss',
        'facebook',
        'linkedin',
        'twitter',
      ],
      control: { type: 'select' },
    },
    icon_direction: {
      options: [
        'up',
        'right',
        'down',
        'left',
      ],
      control: { type: 'select' },
    },
    icon_position: {
      options: [
        'before',
        'after',
      ],
      control: { type: 'select' },
    },
  },
  parameters: {
    controls: {
      include: [
        'icon_name',
        'icon_direction',
        'icon_position',
        'link_text',
      ],
    },
  },
};

const IconLink = args => (
  parse(twigTemplate({
    ...args,
  }))
);
IconLink.args = { ...globalData, ...data };

export default settings;
export { IconLink };
