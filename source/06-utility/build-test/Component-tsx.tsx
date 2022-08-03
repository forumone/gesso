import React from 'react';
import { moduleJS } from './_module-js';

function ComponentTsx(): JSX.Element {
  return <div>{moduleJS()}</div>;
}

export default ComponentTsx;
