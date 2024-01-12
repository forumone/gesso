import parse from 'html-react-parser';

import { withGlobalWrapper } from '../../../../.storybook/decorators';
import twigTemplate from '../form-item.twig';
import textareaTemplate from './_textarea.twig';
import labelTemplate from '../_form-item-label.twig';
import data from './form-item--textarea.yml';

const settings = {
  title: 'Components/Form Item/Textarea',
  decorators: [withGlobalWrapper],
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

const textarea = args =>
  textareaTemplate({
    ...args,
    described_by: args.id ? `${args.id}-description` : null,
  });
const label = args => labelTemplate(args);
const Textarea = {
  render: args =>
    parse(
      twigTemplate({
        ...args,
        label: label(args),
        children: textarea(args),
      })
    ),
  args: { ...data },
};

export default settings;
export { Textarea };
