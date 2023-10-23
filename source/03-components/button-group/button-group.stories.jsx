import parse from 'html-react-parser';

import { withGlobalWrapper } from '../../../.storybook/decorators';
import twigTemplate from './button-group.twig';
import data from './button-group.yml';

const settings = {
  title: 'Components/ButtonGroup',
  decorators: [withGlobalWrapper],
};

const Primary = args =>
  parse(
    twigTemplate({
      ...args,
    })
  );
Primary.args = { ...data };

const Secondary = args =>
  parse(
    twigTemplate({
      ...args,
      button_modifier_classes: 'c-button--secondary',
    })
  );
Secondary.args = { ...data };

const Base = args =>
  parse(
    twigTemplate({
      ...args,
      button_modifier_classes: 'c-button--base',
    })
  );
Base.args = { ...data };

const Danger = args =>
  parse(
    twigTemplate({
      ...args,
      button_modifier_classes: 'c-button--danger',
    })
  );
Danger.args = { ...data };

const Small = args =>
  parse(
    twigTemplate({
      ...args,
      button_modifier_classes: 'c-button--small',
    })
  );
Small.args = { ...data };

const Large = args =>
  parse(
    twigTemplate({
      ...args,
      button_modifier_classes: 'c-button--large',
    })
  );
Large.args = { ...data };

export default settings;
export { Primary, Secondary, Base, Danger, Large, Small };
