import parse from 'html-react-parser';

import { withGlobalWrapper } from '../../../.storybook/decorators.jsx';
import twigTemplate from './fieldset.twig';
import data from './fieldset.yml';
import componentInfo from './fieldset.component.yml';
import getArgTypesFromComponent from '../../../.storybook/getArgTypesFromComponent.js';

const settings = {
  title: 'Components/Fieldset',
  decorators: [withGlobalWrapper],
  argTypes: {
    ...getArgTypesFromComponent(componentInfo),
  },
};

const Fieldset = {
  render: args => parse(twigTemplate(args)),
  args: { ...data },
};

export default settings;
export { Fieldset };
