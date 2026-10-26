import parse from 'html-react-parser';

import { withGlobalWrapper } from '../../../.storybook/decorators.jsx';
import twigTemplate from './hero-inline-image.twig';
import data from './hero-inline-image.yml';
import './hero-inline-image.source.scss';
// Importing components to ensure their assets get loaded in Storybook when they
// get referenced since Drupal loads them as a library.
import '../button/button.stories.jsx';
import componentInfo from './hero-inline-image.component.yml';
import getArgTypesFromComponent from '../../../.storybook/getArgTypesFromComponent.js';

const settings = {
  title: 'Components/Hero/Hero with Inline Image',
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
