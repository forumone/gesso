import parse from 'html-react-parser';

import { withGlobalWrapper } from '../../../.storybook/decorators';
import twigTemplate from './message.twig';
import data from './message.yml';
import './message.scss';

const settings = {
  title: 'Components/Message',
  decorators: [withGlobalWrapper],
};

const Default = {
  render: args => parse(twigTemplate(args)),
  args: { ...data },
};

const ErrorMessage = {
  ...Default,
  args: {
    ...data,
    type: 'error',
  },
};

const WarningMessage = {
  ...Default,
  args: {
    ...data,
    type: 'warning',
  },
};

export default settings;
export { Default, ErrorMessage, WarningMessage };
