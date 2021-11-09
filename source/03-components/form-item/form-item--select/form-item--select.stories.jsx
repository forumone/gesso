import React from 'react';
import parse from 'html-react-parser';

import twigTemplate from './form-item--select.twig';
import data from './form-item--select.yml';
import withGroupsData from './form-item--select-with-groups.yml';

const settings = {
  title: 'Components/Form Item/Select',
};

const Default = args => (
  parse(twigTemplate({
    ...args,
  }))
);
Default.args = { ...data };


const WithGroups = args => (
  parse(twigTemplate({
    ...args,
  }))
);
WithGroups.args = { ...withGroupsData };

export default settings;
export { Default, WithGroups };
