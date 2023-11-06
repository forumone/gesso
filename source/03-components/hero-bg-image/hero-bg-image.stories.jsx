import parse from 'html-react-parser';

import { withGlobalWrapper } from '../../../.storybook/decorators';
import twigTemplate from './hero-bg-image.twig';
import data from './hero-bg-image.yml';
import './hero-bg-image.scss';

const settings = {
  title: 'Components/Hero/Hero with Background Image',
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
    modifier_classes: 'c-hero-bg-image--left',
  },
};

const Right = {
  ...Default,
  args: {
    ...data,
    modifier_classes: 'c-hero-bg-image--right',
  },
};

export default settings;
export { Default, Left, Right };
