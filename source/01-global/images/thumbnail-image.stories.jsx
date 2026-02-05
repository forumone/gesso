import parse from 'html-react-parser';

import twigTemplate from './thumbnail-image.twig';
import globalData from '../../00-config/storybook.global-data.yml';

const settings = {
  title: 'Global/Images/Thumbnail Image',
  parameters: {
    controls: {
      include: ['img_thumbnail', 'modifier_classes'],
    },
  },
};

const ThumbnailImage = {
  render: args => parse(twigTemplate(args)),
  args: { ...globalData },
};

export default settings;
export { ThumbnailImage };
