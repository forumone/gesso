import parse from 'html-react-parser';

import { withGlobalWrapper } from '../../../.storybook/decorators.jsx';
import twigTemplate from './block.twig';
import data from './block.yml';
import './block.source.scss';
import componentInfo from './block.component.yml';
import getArgTypesFromComponent from '../../../.storybook/getArgTypesFromComponent.js';

const settings = {
  title: 'Components/Block',
  decorators: [withGlobalWrapper],
  argTypes: {
    ...getArgTypesFromComponent(componentInfo),
  },
};

const Block = { render: args => parse(twigTemplate(args)), args: { ...data } };

export default settings;
export { Block };
