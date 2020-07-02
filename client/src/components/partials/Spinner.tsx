import React, { Fragment } from 'react';
import spinner from './spinner.svg';

const Spinner: React.FC = () => (
  <Fragment>
    <img
      src={spinner}
      style={{ width: '64px', margin: 'auto', display: 'block' }}
      alt="Loading..."
    />
  </Fragment>
);

export default Spinner;
