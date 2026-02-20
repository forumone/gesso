import parse from 'html-react-parser';

import { withGlobalWrapper } from '../../.storybook/decorators.jsx';
import twigTemplate from './hero-bg-image.twig';
import data from './hero-bg-image.yml';
import './hero-bg-image.source.scss';
import componentInfo from './hero-bg-image.component.yml';
import getArgTypesFromComponent from '../../.storybook/getArgTypesFromComponent.js';

const settings = {
  title: 'Components/Hero/Hero with Background Image',
  decorators: [withGlobalWrapper],
  argTypes: {
    ...getArgTypesFromComponent(componentInfo),
  },
};

const Default = {
  render: args => parse(twigTemplate(args)),
  args: { ...data },
};

const Left = {
  ...Default,
  args: {
    ...data,
    modifier_classes: 'has-content-left',
  },
};

const Right = {
  ...Default,
  args: {
    ...data,
    modifier_classes: 'has-content-right',
  },
};

export default settings;
export { Default, Left, Right };
