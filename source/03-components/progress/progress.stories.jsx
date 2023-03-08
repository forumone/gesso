import parse from 'html-react-parser';

import twigTemplate from './progress.twig';
import data from './progress.yml';

const settings = {
  title: 'Components/Progress',
};

const Progress = args => (
  parse(twigTemplate({
    ...args,
  }))
);
Progress.args = { ...data };

export default settings;
export { Progress };
