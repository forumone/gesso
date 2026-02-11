import parse from 'html-react-parser';

import twigTemplate from './breadcrumb.twig';
import data from './breadcrumb.yml';
import './breadcrumb.source.scss';
import componentInfo from './breadcrumb.component.yml';
import getArgTypesFromComponent from '../../.storybook/getArgTypesFromComponent.js';

const settings = {
  title: 'Components/Breadcrumb',
  args: {
    ...getArgTypesFromComponent(componentInfo),
  },
};

const Breadcrumb = {
  render: args => parse(twigTemplate(args)),
  args: { ...data },
};

export default settings;
export { Breadcrumb };
