import parse from 'html-react-parser';

import { withGlobalWrapper } from '../../../.storybook/decorators.jsx';
import twigTemplate from './list.twig';
import data from './list.yml';
import componentInfo from './list.component.yml';
import getArgTypesFromComponent from '../../../.storybook/getArgTypesFromComponent.js';
import './list.source.scss';

const settings = {
  title: 'Components/List',
  decorators: [withGlobalWrapper],
  argTypes: {
    ...getArgTypesFromComponent(componentInfo),
  },
};

const Default = {
  render: args => parse(twigTemplate(args)),
  args: { ...data },
};

const Border = {
  ...Default,
  args: {
    ...data,
    modifier_classes: 'c-list--border',
  },
};

const Clean = {
  ...Default,
  args: {
    ...data,
    modifier_classes: 'c-list--clean',
  },
};

const Column = {
  ...Default,
  args: {
    ...data,
    modifier_classes: 'c-list--column',
  },
};

const Inline = {
  ...Default,
  args: {
    ...data,
    modifier_classes: 'c-list--inline',
  },
};

const Pipeline = {
  ...Default,
  args: {
    ...data,
    modifier_classes: 'c-list--pipeline',
  },
};

export default settings;
export { Default, Border, Clean, Column, Inline, Pipeline };
