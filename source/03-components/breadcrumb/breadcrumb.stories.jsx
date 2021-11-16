import parse from 'html-react-parser';

import twigTemplate from './breadcrumb.twig';
import data from './breadcrumb.yml';

const settings = {
  title: 'Components/Breadcrumb',
};

const Breadcrumb = args => (
  parse(twigTemplate({
    ...args,
  }))
);
Breadcrumb.args = { ...data };

export default settings;
export { Breadcrumb };
