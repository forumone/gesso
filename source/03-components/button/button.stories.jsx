import parse from 'html-react-parser';

import { withGlobalWrapper } from '../../../.storybook/decorators';
import twigTemplate from './button.twig';
import globalData from '../../00-config/storybook.global-data.yml';
import data from './button.yml';

const settings = {
  title: 'Components/Button',
  decorators: [
    (Story, {args}) =>
      <>
        <Story />
        <Story args={{ ...args, is_button_tag: false, text: 'Link Button' }} />
        <Story args={{ ...args, is_disabled: true, text: 'Disabled Button' }} />
      </>, withGlobalWrapper],
  argTypes: {
    icon_name: {
      options: [
        false,
        'angle',
        'angles',
        'arrow',
        'arrow-long',
        'bars',
        'calendar',
        'caret',
        'check',
        'chevron',
        'download',
        'ellipsis',
        'envelope',
        'file',
        'magnifying-glass',
        'minus',
        'plus',
        'rss',
        'square',
        'square-check',
        'square-empty',
        'xmark',
        'facebook',
        'instagram',
        'linkedin',
        'twitter',
        'youtube',
      ],
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
    icon_is_hidden: {
      control: { type: 'boolean' },
    },
  },
  parameters: {
    controls: {
      include: [
        'text',
        'is_disabled',
        'button_type',
        'modifier_classes',
        'extra_attributes',
        'icon_name',
        'icon_direction',
        'icon_position',
        'icon_label',
        'icon_is_hidden',
      ],
    },
  },
};

const Primary = args =>
  parse(
    twigTemplate({
      ...args,
    })
  );
Primary.args = { ...globalData, ...data };

const Secondary = args =>
  parse(
    twigTemplate({
      ...args,
    })
  );
Secondary.args = { ...globalData, ...data, modifier_classes: 'c-button--secondary', };

const Base = args =>
  parse(
    twigTemplate({
      ...args,
    })
  );
Base.args = { ...globalData, ...data, modifier_classes: 'c-button--base', };

const Danger = args =>
  parse(
    twigTemplate({
      ...args,
    })
  );
Danger.args = { ...globalData, ...data, modifier_classes: 'c-button--danger', };

const Small = args =>
  parse(
    twigTemplate({
      ...args,
    })
  );
Small.args = { ...globalData, ...data, modifier_classes: 'c-button--small', };

const Large = args =>
  parse(
    twigTemplate({
      ...args,
    })
  );
Large.args = { ...globalData, ...data, modifier_classes: 'c-button--large', };

export default settings;
export { Primary, Secondary, Base, Danger, Large, Small };
