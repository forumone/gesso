import parse from 'html-react-parser';

import { withGlobalWrapper } from '../../../../.storybook/decorators';
import twigTemplate from './table-with-row-headers.twig';

const settings = {
  title: 'Global/HTML Elements/Table/Table with Row Headers',
  decorators: [withGlobalWrapper],
  parameters: {
    controls: { hideNoControlsWarning: true },
  },
};

const TableWithRowHeaders = {
  render: () => parse(twigTemplate()),
  storyName: 'Table with Row Headers',
};

export default settings;
export { TableWithRowHeaders };
