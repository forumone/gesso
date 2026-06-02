import parse from 'html-react-parser';

import { withGlobalWrapper } from '../../../.storybook/decorators.jsx';
import twigTemplate from './image-teaser.twig';
import data from './image-teaser.yml';
import './image-teaser.source.scss';
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
