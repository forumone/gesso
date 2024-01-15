import parse from 'html-react-parser';

import twigTemplate from './breadcrumb.twig';
import data from './breadcrumb.yml';
import './breadcrumb.scss';

const settings = {
  title: 'Components/Breadcrumb',
};

const Breadcrumb = {
  render: args => parse(twigTemplate(args)),
  args: { ...data },
};

export default settings;
export { Breadcrumb };
