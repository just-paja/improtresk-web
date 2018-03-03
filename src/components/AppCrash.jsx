import Alert from 'reactstrap/lib/Alert';
import React from 'react';

import Message from '../containers/Message';

import styles from './AppCrash.css';

const AppCrash = () => (
  <div className={styles.container}>
    <div className={styles.dialog}>
      <Alert color="danger">
        <h1><Message name="app.oops" /></h1>
        <p>
          <Message name="app.crash" />
        </p>
        <p>
          info@improliga.cz
        </p>
      </Alert>
    </div>
  </div>
);

export default AppCrash;
