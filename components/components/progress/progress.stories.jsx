import parse from 'html-react-parser';

import { withGlobalWrapper } from '../../.storybook/decorators.jsx';
import twigTemplate from './progress.twig';
import data from './progress.yml';
import './progress.source.scss';
import componentInfo from './progress.component.yml';
import getArgTypesFromComponent from '../../.storybook/getArgTypesFromComponent.js';

const settings = {
  title: 'Components/Progress',
  decorators: [withGlobalWrapper],
  argTypes: {
    ...getArgTypesFromComponent(componentInfo),
  },
};

const Progress = {
  render: args => parse(twigTemplate(args)),
  args: { ...data },
};

export default settings;
export { Progress };
