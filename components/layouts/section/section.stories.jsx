import parse from 'html-react-parser';

import twigTemplate from './section.twig';
import data from './section.yml';
import './section.source.scss';

const settings = {
  title: 'Layouts/Section',
};

const Section = {
  render: args => parse(twigTemplate(args)),
  args: { ...data },
};

export default settings;
export { Section };
