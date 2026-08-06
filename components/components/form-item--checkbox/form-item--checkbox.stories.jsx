import parse from 'html-react-parser';

import { withGlobalWrapper } from '../../../.storybook/decorators';
import twigTemplate from '../form-item/form-item.twig';
import inputTemplate from '../form-item--input/form-item--input.twig';
import labelTemplate from '../form-item--label/form-item--label.twig';
import data from './form-item--checkbox.yml';
import '../form-item/form-item.source.scss';
import './form-item--checkbox.source.scss';

const settings = {
  title: 'Components/Form Item/Checkbox',
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

const label = args => labelTemplate(args);
const children = args =>
  inputTemplate({
    ...args,
    described_by: args.id ? `${args.id}-description` : null,
  });
const Checkbox = {
  render: args =>
    parse(
      twigTemplate({
        ...args,
        label: label(args),
        children: children(args),
      })
    ),
  args: { ...data },
};

export default settings;
export { Checkbox };
