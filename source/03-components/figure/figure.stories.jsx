import parse from 'html-react-parser';

import { withGlobalWrapper } from '../../../.storybook/decorators';
import twigTemplate from './figure.twig';
import data from './figure.yml';
import videoData from './figure--iframe.yml';
import '../video/video.scss';

const settings = {
  title: 'Components/Figure',
  decorators: [withGlobalWrapper],
};

const Default = {
  render: args => parse(twigTemplate(args)),
  args: { ...data },
};

const FigureCentered = {
  ...Default,
  args: {
    ...Default.args,
    modifier_classes: 'u-align-center',
  },
};

const FigureLeftAligned = {
  ...Default,
  args: {
    ...Default.args,
    modifier_classes: 'u-align-left',
  },
};

const FigureRightAligned = {
  ...Default,
  args: {
    ...Default.args,
    modifier_classes: 'u-align-right',
  },
};

const FigureWithVideo = {
  ...Default,
  args: {
    ...videoData,
    modifier_classes: 'c-figure--iframe',
  },
};

const FigureWithVideoCentered = {
  ...FigureWithVideo,
  args: {
    ...FigureWithVideo.args,
    modifier_classes: `${FigureWithVideo.args.modifier_classes} u-align-center`,
  },
};

const FigureWithVideoLeftAligned = {
  ...FigureWithVideo,
  args: {
    ...FigureWithVideo.args,
    modifier_classes: `${FigureWithVideo.args.modifier_classes} u-align-left`,
  },
};

const FigureWithVideoRightAligned = {
  ...FigureWithVideo,
  args: {
    ...FigureWithVideo.args,
    modifier_classes: `${FigureWithVideo.args.modifier_classes} u-align-right`,
  },
};

export default settings;
export {
  Default,
  FigureCentered,
  FigureLeftAligned,
  FigureRightAligned,
  FigureWithVideo,
  FigureWithVideoCentered,
  FigureWithVideoLeftAligned,
  FigureWithVideoRightAligned,
};
