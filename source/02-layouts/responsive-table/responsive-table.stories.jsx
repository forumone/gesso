import parse from 'html-react-parser';

import twigTemplate from './responsive-table.twig';
import data from './responsive-table.yml';

const settings = {
  title: 'Layouts/Responsive Table',
};

const ResponsiveTable = args => (
  parse(twigTemplate({
    ...args,
  }))
);
ResponsiveTable.args = { ...data };

export default settings;
export { ResponsiveTable };
