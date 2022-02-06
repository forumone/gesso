import ReactDom from 'react-dom';
import React from 'react';
import ComponentTsx from './Component-tsx';

ReactDom.render(
  React.createElement(ComponentTsx),
  document.getElementById('root-js')
);
