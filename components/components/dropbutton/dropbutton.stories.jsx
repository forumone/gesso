import parse from 'html-react-parser';

import { withGlobalWrapper } from '../../.storybook/decorators.jsx';
import './dropbutton.source.ts';
import './dropbutton.source.scss';
import data from './dropbutton.yml';
import twigTemplate from './dropbutton.twig';
import componentInfo from './dropbutton.component.yml';
import getArgTypesFromComponent from '../../.storybook/getArgTypesFromComponent.js';

const settings = {
  title: 'Components/Dropbutton',
  decorators: [withGlobalWrapper],
  argTypes: {
    ...getArgTypesFromComponent(componentInfo),
  },
};

const Dropbutton = {
  render: args => parse(twigTemplate(args)),
  args: {
    ...data,
  },
};

export default settings;
export { Dropbutton };
