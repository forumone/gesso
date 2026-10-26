import parse from 'html-react-parser';

import { withGlobalWrapper } from '../../../.storybook/decorators.jsx';
import twigTemplate from './breadcrumb.twig';
import data from './breadcrumb.yml';
import componentInfo from './breadcrumb.component.yml';
import getArgTypesFromComponent from '../../../.storybook/getArgTypesFromComponent.js';
import './breadcrumb.source.scss';

const settings = {
  title: 'Components/Breadcrumb',
  decorators: [withGlobalWrapper],
  argTypes: {
    ...getArgTypesFromComponent(componentInfo),
  },
};

const Breadcrumb = {
  render: args => parse(twigTemplate(args)),
  args: { ...data },
};

export default settings;
export { Breadcrumb };
