import parse from 'html-react-parser';

import twigTemplate from '../form-item.twig';
import inputTemplate from '../_input.twig';
import labelTemplate from '../_form-item-label.twig';
import data from './form-item--checkbox.yml';

const settings = {
  title: 'Components/Form Item/Checkbox',
  argTypes: {
    label_display: {
      options: ['before', 'after', 'invisible', 'hidden'],
      control: { type: 'select' },
    },
    description_display: {
      options: ['before', 'after', 'invisible', 'hidden'],
      control: { type: 'select' },
    },
  },
};

const label = args => labelTemplate(args);
const children = args =>
  inputTemplate({
    ...args,
    described_by: args.id ? `${args.id}-description` : null,
  });
const Checkbox = args =>
  parse(
    twigTemplate({
      ...args,
      label: label(args),
      children: children(args),
    })
  );
Checkbox.args = { ...data };

export default settings;
export { Checkbox };
