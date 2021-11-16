import parse from 'html-react-parser';

import twigTemplate from './table-with-column-and-row-headers.twig';

const settings = {
  title: 'Global/HTML Elements/Table/Table with Column and Row Headers',
  parameters: {
    controls: { hideNoControlsWarning: true },
  },
};

const TableWithColumnAndRowHeaders = () => (
  parse(twigTemplate())
);

TableWithColumnAndRowHeaders.storyName = 'Table with Column and Row Headers';

export default settings;
export { TableWithColumnAndRowHeaders };
