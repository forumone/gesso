import parse from 'html-react-parser';

import { withGlobalWrapper } from '../../../.storybook/decorators';
import twigTemplate from '../form-item/form-item.twig';
import selectTemplate from './form-item--select.twig';
import labelTemplate from '../form-item--label/form-item--label.twig';
import data from './form-item--select.yml';
import withGroupsData from './form-item--select-with-groups.yml';
import '../form-item/form-item.source.scss';
import './form-item--select.source.scss';

const settings = {
  title: 'Components/Form Item/Select',
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

const select = args =>
  selectTemplate({
    ...args,
    described_by: args.id ? `${args.id}-description` : null,
  });
const label = args => labelTemplate(args);
const Default = {
  render: args =>
    parse(
      twigTemplate({
        ...args,
        label: label(args),
        children: select(args),
      })
    ),
  args: { ...data },
};

const WithGroups = {
  ...Default,
  args: {
    ...withGroupsData,
  },
};

export default settings;
export { Default, WithGroups };
