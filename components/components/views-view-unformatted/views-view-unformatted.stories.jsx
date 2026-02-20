import parse from 'html-react-parser';

import { withGlobalWrapper } from '../../.storybook/decorators.jsx';
import twigTemplate from './views-view-unformatted.twig';
import data from './views-view-unformatted.yml';
import componentInfo from './views-view-unformatted.component.yml';
import getArgTypesFromComponent from '../../.storybook/getArgTypesFromComponent.js';

const settings = {
  title: 'Components/Views/Unformatted',
  decorators: [withGlobalWrapper],
  argTypes: {
    ...getArgTypesFromComponent(componentInfo),
  },
};

const Unformatted = {
  render: args => parse(twigTemplate(args)),
  args: { ...data },
};

export default settings;
export { Unformatted };
