import parse from 'html-react-parser';

import twigTemplate from './video.twig';
import data from './video.yml';
import localData from './video--local.yml';

const settings = {
  title: 'Components/Video',
};

const RemoteVideo = args => (
  parse(twigTemplate({
    ...args,
  }))
);
RemoteVideo.args = { ...data };

const LocalVideo = args => (
  parse(twigTemplate({
    ...args,
  }))
);
LocalVideo.args = { ...localData };

export default settings;
export { RemoteVideo, LocalVideo };
