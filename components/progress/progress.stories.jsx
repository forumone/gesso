import parse from 'html-react-parser';

import { withGlobalWrapper } from '../../.storybook/decorators.jsx';
import twigTemplate from './progress.twig';
import data from './progress.yml';
import './progress.source.scss';

const settings = {
  title: 'Components/Progress',
  decorators: [withGlobalWrapper],
};

const Progress = {
  render: args => parse(twigTemplate(args)),
  args: { ...data },
};

export default settings;
export { Progress };
