import parse from 'html-react-parser';

import { withGlobalWrapper } from '../../.storybook/decorators.jsx';
import twigTemplate from './teaser.twig';
import data from './teaser.yml';
import './teaser.source.scss';
import componentInfo from './teaser.component.yml';
import getArgTypesFromComponent from '../../.storybook/getArgTypesFromComponent.js';

const settings = {
  title: 'Components/Teaser',
  decorators: [withGlobalWrapper],
  argTypes: {
    ...getArgTypesFromComponent(componentInfo),
  },
};

const Teaser = { render: args => parse(twigTemplate(args)), args: { ...data } };

export default settings;
export { Teaser };
