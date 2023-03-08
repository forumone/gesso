import parse from 'html-react-parser';

import twigTemplate from './figure.twig';
import data from './figure.yml';
import videoData from './figure--iframe.yml';

const settings = {
  title: 'Components/Figure',
};

const Default = args => (
  parse(twigTemplate({
    ...args,
  }))
);
Default.args = { ...data };

const FigureCentered = args => (
  parse(twigTemplate({
    ...args,
    modifier_classes: 'u-align-center',
  }))
);
FigureCentered.args = { ...data };

const FigureLeftAligned = args => (
  parse(twigTemplate({
    ...args,
    modifier_classes: 'u-align-left',
  }))
);
FigureLeftAligned.args = { ...data };

const FigureRightAligned = args => (
  parse(twigTemplate({
    ...args,
    modifier_classes: 'u-align-right',
  }))
);
FigureRightAligned.args = { ...data };

const FigureWithVideo = args => (
  parse(twigTemplate({
    ...args,
    modifier_classes: 'c-figure--iframe',
  }))
);
FigureWithVideo.args = { ...videoData };

const FigureWithVideoCentered = args => (
  parse(twigTemplate({
    ...args,
    modifier_classes: 'c-figure--iframe u-align-center',
  }))
);
FigureWithVideoCentered.args = { ...videoData };

const FigureWithVideoLeftAligned = args => (
  parse(twigTemplate({
    ...args,
    modifier_classes: 'c-figure--iframe u-align-left',
  }))
);
FigureWithVideoLeftAligned.args = { ...videoData };

const FigureWithVideoRightAligned = args => (
  parse(twigTemplate({
    ...args,
    modifier_classes: 'c-figure--iframe u-align-right',
  }))
);
FigureWithVideoRightAligned.args = { ...videoData };

export default settings;
export { Default, FigureCentered, FigureLeftAligned, FigureRightAligned, FigureWithVideo, FigureWithVideoCentered, FigureWithVideoLeftAligned, FigureWithVideoRightAligned };
