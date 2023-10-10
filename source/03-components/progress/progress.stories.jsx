import parse from 'html-react-parser';

import { withGlobalWrapper } from '../../../.storybook/decorators';
import twigTemplate from './progress.twig';
import data from './progress.yml';
import './progress.scss';

const settings = {
  title: 'Components/Progress',
  decorators: [withGlobalWrapper],
};

const Progress = args =>
  parse(
    twigTemplate({
      ...args,
    })
  );
Progress.args = { ...data };

export default settings;
export { Progress };
