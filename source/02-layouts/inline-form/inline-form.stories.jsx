import parse from 'html-react-parser';

import twigTemplate from './inline-form.twig';
import data from './inline-form.yml';

const settings = {
  title: 'Layouts/Inline Form',
  argTypes: {
    is_demo: {
      table: {
        disable: true
      }
    }
  },
};

const InlineForm = args => (
  parse(twigTemplate({
    ...args,
  }))
);
InlineForm.args = { ...data };

export default settings;
export { InlineForm };
