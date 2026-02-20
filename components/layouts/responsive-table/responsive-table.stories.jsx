import parse from 'html-react-parser';

import twigTemplate from './responsive-table.twig';
import data from './responsive-table.yml';

const settings = {
  title: 'Layouts/Responsive Table',
};

const ResponsiveTable = {
  render: args => parse(twigTemplate(args)),
  args: { ...data },
};

export default settings;
export { ResponsiveTable };
