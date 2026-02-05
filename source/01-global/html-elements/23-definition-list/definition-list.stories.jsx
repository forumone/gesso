import parse from 'html-react-parser';

import { withGlobalWrapper } from '../../../../.storybook/decorators';
import twigTemplate from './definition-list.twig';

const settings = {
  title: 'Global/HTML Elements/Definition List',
  decorators: [withGlobalWrapper],
  parameters: {
    controls: { hideNoControlsWarning: true },
  },
};

const DefinitionList = { render: () => parse(twigTemplate()) };

export default settings;
export { DefinitionList };
