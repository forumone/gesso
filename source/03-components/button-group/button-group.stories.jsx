import parse from 'html-react-parser';

import { withGlobalWrapper } from '../../../.storybook/decorators';
import twigTemplate from './button-group.twig';
import data from './button-group.yml';

const settings = {
  title: 'Components/ButtonGroup',
  decorators: [withGlobalWrapper],
};

const Primary = {
  render: args => parse(twigTemplate(args)),
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
