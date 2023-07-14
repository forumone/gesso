import parse from 'html-react-parser';

import twigTemplate from './button.twig';
import globalData from '../../00-config/storybook.global-data.yml';
import data from './button.yml';

const settings = {
  title: 'Components/Button',
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
        'text_demo',
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
      modifier_classes: 'c-button--secondary',
    })
  );
Secondary.args = { ...globalData, ...data };

const Base = args =>
  parse(
    twigTemplate({
      ...args,
      modifier_classes: 'c-button--base',
    })
  );
Base.args = { ...globalData, ...data };

const Danger = args =>
  parse(
    twigTemplate({
      ...args,
      modifier_classes: 'c-button--danger',
    })
  );
Danger.args = { ...globalData, ...data };

const Small = args =>
  parse(
    twigTemplate({
      ...args,
      modifier_classes: 'c-button--small',
    })
  );
Small.args = { ...globalData, ...data };

const Large = args =>
  parse(
    twigTemplate({
      ...args,
      modifier_classes: 'c-button--large',
    })
  );
Large.args = { ...globalData, ...data };

export default settings;
export { Primary, Secondary, Base, Danger, Large, Small };
