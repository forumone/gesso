import parse from 'html-react-parser';

import twigTemplate from './message.twig';
import data from './message.yml';

const settings = {
  title: 'Components/Message',
};

const Default = args => (
  parse(twigTemplate({
    ...args,
  }))
);
Default.args = { ...data };

const ErrorMessage = args => (
  parse(twigTemplate({
    ...args,
    type: 'error',
  }))
);
ErrorMessage.args = { ...data };

const WarningMessage = args => (
  parse(twigTemplate({
    ...args,
    type: 'warning',
  }))
);
WarningMessage.args = { ...data };

export default settings;
export { Default, ErrorMessage, WarningMessage };
