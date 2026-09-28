import React, { JSX } from 'react';

import styles from './Example.module.scss';
import { EXAMPLE_PROPERTY } from '../constants';

const Example = (): JSX.Element => (
  <div className={styles.blackBox}>
    <p>{`This is an example block. ${EXAMPLE_PROPERTY}`}</p>
  </div>
);

export default Example;
