import parse from 'html-react-parser';

import { withGlobalWrapper } from '../../../.storybook/decorators.jsx';
import twigTemplate from './image-teaser.twig';
import data from './image-teaser.yml';
import './image-teaser.source.scss';
// Importing components to ensure their assets get loaded in Storybook when they
// get referenced since Drupal loads them as a library.
import '../../layouts/media/media.stories.jsx';
import componentInfo from './image-teaser.component.yml';
import getArgTypesFromComponent from '../../../.storybook/getArgTypesFromComponent.js';

const settings = {
  title: 'Components/Image Teaser',
  decorators: [withGlobalWrapper],
  argTypes: {
    ...getArgTypesFromComponent(componentInfo),
  },
};

const ImageTeaser = {
  render: args => parse(twigTemplate(args)),
  args: { ...data },
};

export default settings;
export { ImageTeaser };
