import parse from 'html-react-parser';

import { withGlobalWrapper } from '../../.storybook/decorators.jsx';
import twigTemplate from './tag.twig';
import data from './tag.yml';
import './tag.source.scss';
import componentInfo from './tag.component.yml';
import getArgTypesFromComponent from '../../.storybook/getArgTypesFromComponent.js';

const settings = {
  title: 'Components/Tag',
  decorators: [withGlobalWrapper],
  argTypes: {
    ...getArgTypesFromComponent(componentInfo),
  },
};

const Tag = { render: args => parse(twigTemplate(args)), args: { ...data } };

export default settings;
export { Tag };
