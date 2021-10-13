import React from 'react';

import './dropbutton.es6';
import './dropbutton.scss';
import twigTemplate from './dropbutton.twig';

const settings = {
  title: 'Components/Dropbutton',
};

const Dropbutton = args => (
  <div
    dangerouslySetInnerHTML={{
      __html: twigTemplate({
        ...args,
      }),
    }}
  />
);
Dropbutton.args = {};

export default settings;
export { Dropbutton };
