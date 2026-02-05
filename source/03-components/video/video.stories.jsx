import parse from 'html-react-parser';

import { withGlobalWrapper } from '../../../.storybook/decorators';
import twigTemplate from './video.twig';
import data from './video.yml';
import localData from './video--local.yml';
import './video.scss';

const settings = {
  title: 'Components/Video',
  decorators: [withGlobalWrapper],
};

const RemoteVideo = {
  render: args => parse(twigTemplate(args)),
  args: { ...data },
};

const LocalVideo = {
  ...RemoteVideo,
  args: { ...localData },
};

export default settings;
export { RemoteVideo, LocalVideo };
