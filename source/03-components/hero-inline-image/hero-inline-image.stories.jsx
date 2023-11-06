import parse from 'html-react-parser';

import { withGlobalWrapper } from '../../../.storybook/decorators';
import twigTemplate from './hero-inline-image.twig';
import data from './hero-inline-image.yml';
import './hero-inline-image.scss';

const settings = {
  title: 'Components/Hero/Hero with Inline Image',
  decorators: [withGlobalWrapper],
};

const Default = {
  render: args =>
    parse(
      twigTemplate({
        ...args,
      })
    ),
  args: { ...data },
};

const Left = {
  ...Default,
  args: {
    ...data,
    modifier_classes: 'c-hero-inline-image--left',
  },
};

const Right = {
  ...Default,
  args: {
    ...data,
    modifier_classes: 'c-hero-inline-image--right',
  },
};

export default settings;
export { Default, Left, Right };
