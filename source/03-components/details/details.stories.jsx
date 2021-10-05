import React from 'react';

// import "./details-element-polyfill.js";
import twigTemplate from './details.twig';
import data from './details.yml';

const settings = {
  title: 'Components/Details',
};

const Details = args => (
  <div
    dangerouslySetInnerHTML={{
      __html: twigTemplate({
        ...args,
      }),
    }}
  />
);
Details.args = { ...data };

export default settings;
export { Details };
