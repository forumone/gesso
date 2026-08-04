import parse from 'html-react-parser';

import { withGlobalWrapper } from '../../../.storybook/decorators';
import defaultTemplate from './small-image.twig';
import ratio16x9Template from './small-image-16x9.twig';
import ratio4x3Template from './small-image-4x3.twig';
import ratio3x4Template from './small-image-3x4.twig';
import globalData from '../../00-config/storybook.global-data.yml';

const settings = {
  title: 'Global/Responsive Images/Small Image',
  decorators: [withGlobalWrapper],
  parameters: {
    controls: {
      include: ['modifier_classes'],
    },
  },
};

const Default = {
  render: args => parse(defaultTemplate(args)),
  args: { ...globalData },
};

const Ratio16x9 = {
  render: args => parse(ratio16x9Template(args)),
  args: { ...globalData },
};

const Ratio4x3 = {
  render: args => parse(ratio4x3Template(args)),
  args: { ...globalData },
};

const Ratio3x4 = {
  render: args => parse(ratio3x4Template(args)),
  args: { ...globalData },
};

export default settings;
export { Default, Ratio16x9, Ratio4x3, Ratio3x4 };
