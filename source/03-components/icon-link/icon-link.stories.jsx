import parse from 'html-react-parser';

import { withGlobalWrapper } from '../../../.storybook/decorators';
import twigTemplate from './icon-link.twig';
import data from './icon-link.yml';
import globalData from '../../00-config/storybook.global-data.yml';
import './icon-link.scss';
import { Icon } from '../icon/icon.stories';
import ReactDOMServer from 'react-dom/server';

const settings = {
  title: 'Components/Icon Link',
  decorators: [withGlobalWrapper],
  argTypes: {
    icon_name: {
      options: [false, ...globalData.icons],
      control: { type: 'select' },
    },
    icon_direction: {
      options: ['up', 'right', 'down', 'left'],
      control: { type: 'select' },
    },
    icon_position: {
      options: ['before', 'after', 'both'],
      control: { type: 'select' },
    },
  },
  parameters: {
    controls: {
      include: [
        'icon_name',
        'icon_direction',
        'icon_position',
        'icon_label',
        'icon_is_hidden',
        'link_text',
      ],
    },
  },
};

const IconLink = {
  render: ({ icon_name, icon_direction, icon_position, ...args }) => {
    const icon_before =
      icon_position === 'before' || icon_position === 'both'
        ? ReactDOMServer.renderToStaticMarkup(
            Icon.render({
              ...Icon.args,
              direction: icon_direction,
              icon_name,
              modifier_classes: 'c-icon-link__icon is-spaced-after',
            })
          )
        : null;
    const icon_after =
      icon_position === 'after' || icon_position === 'both'
        ? ReactDOMServer.renderToStaticMarkup(
            Icon.render({
              ...Icon.args,
              direction: icon_direction,
              icon_name,
              modifier_classes: 'c-icon-link__icon is-spaced-before',
            })
          )
        : null;
    return parse(
      twigTemplate({
        icon_before,
        icon_after,
        ...args,
      })
    );
  },
  args: { ...globalData, ...data },
};

export default settings;
export { IconLink };
