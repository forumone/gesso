import parse from 'html-react-parser';

import twigTemplate from '../form-item.twig';
import textareaTemplate from './_textarea.twig';
import labelTemplate from '../_form-item-label.twig';
import data from './form-item--textarea.yml';

const settings = {
  title: 'Components/Form Item/Textarea',
};

const textarea = args => textareaTemplate(args);
const label = args => labelTemplate(args);
const Textarea = args =>
  parse(
    twigTemplate({
      ...args,
      label: label(args),
      children: textarea(args),
    })
  );
Textarea.args = { ...data };

export default settings;
export { Textarea };
