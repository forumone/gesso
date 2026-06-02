import parse from 'html-react-parser';

import { withGlobalWrapper } from '../../../.storybook/decorators.jsx';
import twigTemplate from './video.twig';
import data from './video.yml';
import localData from './video--local.yml';
import './video.source.scss';
import componentInfo from './video.component.yml';
import getArgTypesFromComponent from '../../../.storybook/getArgTypesFromComponent.js';

const settings = {
  title: 'Components/Video',
  decorators: [withGlobalWrapper],
  argTypes: {
    ...getArgTypesFromComponent(componentInfo),
  },
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
