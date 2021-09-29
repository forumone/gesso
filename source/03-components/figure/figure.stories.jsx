import React from 'react';

import twigTemplate from './figure.twig';
import data from './figure.yml';
import videoData from './figure--video.yml';

const settings = {
  title: 'Components/Figure',
};

const Default = args => (
  <div
    dangerouslySetInnerHTML={{
      __html: twigTemplate({
        ...args,
      }),
    }}
  />
);
Default.args = { ...data };

const FigureCentered = args => (
  <div
    dangerouslySetInnerHTML={{
      __html: twigTemplate({
        ...args,
        modifier_classes: 'u-align-center',
      }),
    }}
  />
);
FigureCentered.args = { ...data };

const FigureLeftAligned = args => (
  <div
    dangerouslySetInnerHTML={{
      __html: twigTemplate({
        ...args,
        modifier_classes: 'u-align-left',
      }),
    }}
  />
);
FigureLeftAligned.args = { ...data };

const FigureRightAligned = args => (
  <div
    dangerouslySetInnerHTML={{
      __html: twigTemplate({
        ...args,
        modifier_classes: 'u-align-right',
      }),
    }}
  />
);
FigureRightAligned.args = { ...data };

const FigureWithVideo = args => (
  <div
    dangerouslySetInnerHTML={{
      __html: twigTemplate({
        ...args,
        modifier_classes: 'figure--video',
      }),
    }}
  />
);
FigureWithVideo.args = { ...videoData };

const FigureWithVideoCentered = args => (
  <div
    dangerouslySetInnerHTML={{
      __html: twigTemplate({
        ...args,
        modifier_classes: 'figure--video u-align-center',
      }),
    }}
  />
);
FigureWithVideoCentered.args = { ...videoData };

const FigureWithVideoLeftAligned = args => (
  <div
    dangerouslySetInnerHTML={{
      __html: twigTemplate({
        ...args,
        modifier_classes: 'figure--video u-align-left',
      }),
    }}
  />
);
FigureWithVideoLeftAligned.args = { ...videoData };

const FigureWithVideoRightAligned = args => (
  <div
    dangerouslySetInnerHTML={{
      __html: twigTemplate({
        ...args,
        modifier_classes: 'figure--video u-align-right',
      }),
    }}
  />
);
FigureWithVideoRightAligned.args = { ...videoData };

export default settings;
export { Default, FigureCentered, FigureLeftAligned, FigureRightAligned, FigureWithVideo, FigureWithVideoCentered, FigureWithVideoLeftAligned, FigureWithVideoRightAligned };
