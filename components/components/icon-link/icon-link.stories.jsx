import parse from 'html-react-parser';

import { withGlobalWrapper } from '../../../.storybook/decorators.jsx';
import twigTemplate from './icon-link.twig';
import data from './icon-link.yml';
import globalData from '../../../source/00-config/storybook.global-data.yml';
import { Icon } from '../icon/icon.stories';
import './icon-link.source.scss';
import ReactDOMServer from 'react-dom/server';
import componentInfo from './icon-link.component.yml';
import getArgTypesFromComponent from '../../../.storybook/getArgTypesFromComponent.js';

const baseArgTypes = getArgTypesFromComponent(componentInfo, {
  hideArgs: globalData,
  hide: [
    'icon_modifier_classes',
    'image_path',
    'icon_before',
    'icon_after',
    'no_follow',
    'storybook',
  ],
});

const settings = {
  title: 'Components/Icon Link',
  decorators: [withGlobalWrapper],
  argTypes: {
    ...baseArgTypes,
    icon_name: {
      ...baseArgTypes.icon_name,
      options: [false, ...globalData.icons],
      control: { type: 'select' },
    },
    icon_direction: {
      ...baseArgTypes.icon_direction,
      options: ['up', 'right', 'down', 'left'],
      control: { type: 'select' },
    },
    icon_position: {
      ...baseArgTypes.icon_position,
      options: ['before', 'after', 'both'],
      control: { type: 'select' },
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
