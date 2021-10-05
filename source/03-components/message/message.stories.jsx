import React from 'react';

import twigTemplate from './message.twig';
import data from './message.yml';

const settings = {
  title: 'Components/Message',
};

const Default = args => (
  <div
    dangerouslySetInnerHTML={{
      __html: twigTemplate({
        ...args,
      }),
    }}
  />
);
Default.args = { ...data };

const ErrorMessage = args => (
  <div
    dangerouslySetInnerHTML={{
      __html: twigTemplate({
        ...args,
        type: 'error',
      }),
    }}
  />
);
ErrorMessage.args = { ...data };

const WarningMessage = args => (
  <div
    dangerouslySetInnerHTML={{
      __html: twigTemplate({
        ...args,
        type: 'warning',
      }),
    }}
  />
);
WarningMessage.args = { ...data };

export default settings;
export { Default, ErrorMessage, WarningMessage };
