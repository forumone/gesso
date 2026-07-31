import parse from 'html-react-parser';

import { withGlobalWrapper } from '../../../.storybook/decorators.jsx';
import buttonGroupTemplate from './button-group.twig';
import buttonGroupItemTemplate from '../button-group-item/button-group-item.twig';
import data from './button-group.yml';
import './button-group.source.scss';
import '../button/button.source.scss';

const settings = {
  title: 'Components/ButtonGroup',
  decorators: [withGlobalWrapper],
};

const Primary = {
  render: args => {
    const buttonGroupItems = (args.button_group_data || data.button_group_data)
      .map(item => buttonGroupItemTemplate({ ...args, ...item }))
      .join('');

    return parse(
      buttonGroupTemplate({
        button_group_items: buttonGroupItems,
        ...args,
      })
    );
  },
  args: { ...data },
};

const Secondary = {
  ...Primary,
  args: {
    ...Primary.args,
    button_modifier_classes: 'c-button--secondary',
  },
};

const Base = {
  ...Primary,
  args: {
    ...Primary.args,
    button_modifier_classes: 'c-button--base',
  },
};

const Danger = {
  ...Primary,
  args: {
    ...Primary.args,
    button_modifier_classes: 'c-button--danger',
  },
};

const Small = {
  ...Primary,
  args: {
    ...Primary.args,
    button_modifier_classes: 'c-button--small',
  },
};

const Large = {
  ...Primary,
  args: {
    ...Primary.args,
    button_modifier_classes: 'c-button--large',
  },
};

export default settings;
export { Primary, Secondary, Base, Danger, Large, Small };
