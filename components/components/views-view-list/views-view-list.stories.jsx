import parse from 'html-react-parser';

import { withGlobalWrapper } from '../../../.storybook/decorators.jsx';
import twigTemplate from './views-view-list.twig';
import data from './views-view-list.yml';
import componentInfo from './views-view-list.component.yml';
import getArgTypesFromComponent from '../../../.storybook/getArgTypesFromComponent.js';

const settings = {
  title: 'Components/Views/List',
  decorators: [withGlobalWrapper],
  argTypes: {
    ...getArgTypesFromComponent(componentInfo),
  },
};

const List = {
  render: args => parse(twigTemplate(args)),
  args: { ...data },
};

export default settings;
export { List };
