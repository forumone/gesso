import parse from 'html-react-parser';

import { withGlobalWrapper } from '../../../../.storybook/decorators';
import twigTemplate from './table-with-column-and-row-headers.twig';

const settings = {
  title: 'Global/HTML Elements/Table/Table with Column and Row Headers',
  decorators: [withGlobalWrapper],
  parameters: {
    controls: { hideNoControlsWarning: true },
  },
};

const TableWithColumnAndRowHeaders = {
  render: () => parse(twigTemplate()),
  storyName: 'Table with Column and Row Headers',
};

export default settings;
export { TableWithColumnAndRowHeaders };
