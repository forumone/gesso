import parse from 'html-react-parser';

import { withGlobalWrapper } from '../../../.storybook/decorators.jsx';
import twigTemplate from './date.twig';
import globalData from '../../../source/00-config/storybook.global-data.yml';
import data from './date.yml';
import './date.source.scss';
import componentInfo from './date.component.yml';
import getArgTypesFromComponent from '../../../.storybook/getArgTypesFromComponent.js';

const settings = {
  title: 'Components/Date',
  decorators: [withGlobalWrapper],
  argTypes: {
    ...getArgTypesFromComponent(componentInfo, {
      hideArgs: globalData,
      show: ['year', 'month', 'weekday', 'day'],
    }),
  },
};

const Date = {
  render: args => parse(twigTemplate(args)),
  args: { ...globalData, ...data },
};

export default settings;
export { Date };
