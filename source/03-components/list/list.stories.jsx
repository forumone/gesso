import React from 'react';

import twigTemplate from './list.twig';
import data from './list.yml';

const settings = {
  title: 'Components/List',
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

const Border = args => (
  <div
    dangerouslySetInnerHTML={{
      __html: twigTemplate({
        ...args,
        modifier_classes: 'list--border',
      }),
    }}
  />
);
Border.args = { ...data };

const Clean = args => (
  <div
    dangerouslySetInnerHTML={{
      __html: twigTemplate({
        ...args,
        modifier_classes: 'list--clean',
      }),
    }}
  />
);
Clean.args = { ...data };

const Column = args => (
  <div
    dangerouslySetInnerHTML={{
      __html: twigTemplate({
        ...args,
        modifier_classes: 'list--column',
      }),
    }}
  />
);
Column.args = { ...data };

const Inline = args => (
  <div
    dangerouslySetInnerHTML={{
      __html: twigTemplate({
        ...args,
        modifier_classes: 'list--inline',
      }),
    }}
  />
);
Inline.args = { ...data };

const Pipeline = args => (
  <div
    dangerouslySetInnerHTML={{
      __html: twigTemplate({
        ...args,
        modifier_classes: 'list--pipeline',
      }),
    }}
  />
);
Pipeline.args = { ...data };

export default settings;
export { Default, Border, Clean, Column, Inline, Pipeline };
