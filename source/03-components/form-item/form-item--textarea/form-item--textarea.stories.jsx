import parse from 'html-react-parser';

import twigTemplate from './form-item--textarea.twig';
import data from './form-item--textarea.yml';

const settings = {
  title: 'Components/Form Item/Textarea',
};

const Textarea = args => (
  parse(twigTemplate({
    ...args,
  }))
);
Textarea.args = { ...data };

export default settings;
export { Textarea };
