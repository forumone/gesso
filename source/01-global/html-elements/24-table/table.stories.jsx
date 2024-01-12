import parse from 'html-react-parser';

import { withGlobalWrapper } from '../../../../.storybook/decorators';
import twigTemplate from './table.twig';

const settings = {
  title: 'Global/HTML Elements/Table',
  decorators: [withGlobalWrapper],
  parameters: {
    controls: { hideNoControlsWarning: true },
  },
};

const Default = { render: () => parse(twigTemplate()) };

export default settings;
export { Default };
