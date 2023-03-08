import ReactDom from 'react-dom';
import React from 'react';
import ComponentJsx from './Component-jsx';

ReactDom.render(
  React.createElement(ComponentJsx),
  document.getElementById('root-ts')
);
