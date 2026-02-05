import parse from 'html-react-parser';

import twigTemplate from './hero-image.twig';
import globalData from '../../00-config/storybook.global-data.yml';

const settings = {
  title: 'Global/Images/Hero Image',
  parameters: {
    controls: {
      include: ['img_hero', 'modifier_classes'],
    },
  },
};

const HeroImage = {
  render: args => parse(twigTemplate(args)),
  args: { ...globalData },
};

export default settings;
export { HeroImage };
