import parse from 'html-react-parser';

import twigTemplate from './image-teaser.twig';
import data from './image-teaser.yml';

const settings = {
  title: 'Components/Image Teaser',
};

const ImageTeaser = args => (
  parse(twigTemplate({
    ...args,
  }))
);
ImageTeaser.args = { ...data };

export default settings;
export { ImageTeaser };
