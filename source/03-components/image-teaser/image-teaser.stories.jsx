import parse from 'html-react-parser';

import { withGlobalWrapper } from '../../../.storybook/decorators';
import twigTemplate from './image-teaser.twig';
import data from './image-teaser.yml';
import './image-teaser.scss';

const settings = {
  title: 'Components/Image Teaser',
  decorators: [withGlobalWrapper],
};

const ImageTeaser = {
  render: args => parse(twigTemplate(args)),
  args: { ...data },
};

export default settings;
export { ImageTeaser };
