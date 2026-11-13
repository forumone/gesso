import parse from 'html-react-parser';

import { withGlobalWrapper } from '../../../.storybook/decorators.jsx';
import twigTemplate from './button.twig';
import globalData from '../../../source/00-config/storybook.global-data.yml';
import data from './button.yml';
import ReactDOMServer from 'react-dom/server';
import { Icon } from '../icon/icon.stories';
import './button.source.scss';
import componentInfo from './button.component.yml';
import getArgTypesFromComponent from '../../../.storybook/getArgTypesFromComponent.js';

const baseArgTypes = getArgTypesFromComponent(componentInfo, {
  hideArgs: globalData,
  hide: [
    'no_follow',
    'image_path',
    'button_icon_before',
    'button_icon_after',
    'storybook',
  ],
});

const settings = {
  title: 'Components/Button',
  decorators: [
    (Story, { args }) => (
      <>
        <Story />
        <Story args={{ ...args, is_button_tag: false, text: 'Link Button' }} />
        <Story args={{ ...args, is_disabled: true, text: 'Disabled Button' }} />
      </>
    ),
    withGlobalWrapper,
  ],
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
    icon_is_hidden: {
      ...baseArgTypes.icon_is_hidden,
      control: { type: 'boolean' },
    },
  },
};

const Primary = {
  render: ({
    icon_name,
    icon_direction,
    icon_position,
    icon_label,
    icon_is_hidden,
    ...args
  }) => {
    const button_icon_before =
      icon_name && (icon_position === 'before' || icon_position === 'both')
        ? ReactDOMServer.renderToStaticMarkup(
            Icon.render({
              ...Icon.args,
              direction: icon_direction,
              icon_name,
              label: icon_label,
              is_hidden: icon_is_hidden,
              modifier_classes: 'c-button__icon is-spaced-after',
            })
          )
        : null;
    const button_icon_after =
      icon_name && (icon_position === 'after' || icon_position === 'both')
        ? ReactDOMServer.renderToStaticMarkup(
            Icon.render({
              ...Icon.args,
              direction: icon_direction,
              icon_name,
              label: icon_label,
              is_hidden: icon_is_hidden,
              modifier_classes: 'c-button__icon is-spaced-before',
            })
          )
        : null;
    return parse(
      twigTemplate({
        button_icon_before,
        button_icon_after,
        ...args,
      })
    );
  },
  args: { ...globalData, ...data },
};

const Secondary = {
  ...Primary,
  args: {
    ...Primary.args,
    modifier_classes: 'c-button--secondary',
  },
};

const Base = {
  ...Primary,
  args: {
    ...Primary.args,
    modifier_classes: 'c-button--base',
  },
};

const Danger = {
  ...Primary,
  args: {
    ...Primary.args,
    modifier_classes: 'c-button--danger',
  },
};

const Small = {
  ...Primary,
  args: {
    ...Primary.args,
    modifier_classes: 'c-button--small',
  },
};

const Large = {
  ...Primary,
  args: {
    ...Primary.args,
    modifier_classes: 'c-button--large',
  },
};

export default settings;
export { Primary, Secondary, Base, Danger, Large, Small };
