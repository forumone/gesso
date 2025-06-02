import parse from 'html-react-parser';

import twigTemplate from './section.twig';
import data from './section.yml';

const settings = {
  title: 'Layouts/Section',
  argTypes: {
    theme: {
      options: [
        '',
        'default',
        'gray-6',
      ],
      control: { type: 'select' },
    },
  },
  parameters: {
    controls: {
      include: [
        'modifier_classes',
        'theme',
        'has_constrain',
        'constrain_modifier_classes',
        'section_title_element',
        'section_title',
      ],
    },
  },
};

const Section = {
  render: args => parse(twigTemplate(args)),
  args: { ...data },
};

export default settings;
export { Section };
