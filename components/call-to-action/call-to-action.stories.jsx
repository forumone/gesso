import parse from 'html-react-parser';

import { withGlobalWrapper } from '../../.storybook/decorators.jsx';
import twigTemplate from './call-to-action.twig';
import data from './call-to-action.yml';
import './call-to-action.source.scss';
import componentInfo from './call-to-action.component.yml';
import getArgTypesFromComponent from '../../.storybook/getArgTypesFromComponent.js';

const settings = {
  title: 'Components/Call To Action',
  decorators: [withGlobalWrapper],
  argTypes: {
    ...getArgTypesFromComponent(componentInfo),
  },
};

const CallToAction = {
  render: args => parse(twigTemplate(args)),
  args: { ...data },
};

export default settings;
export { CallToAction };
