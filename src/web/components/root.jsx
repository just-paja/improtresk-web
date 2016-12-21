import React, { PropTypes } from 'react';

import { Router } from 'react-router';
import { Provider } from 'react-redux';

import configureRoutes from '../routes';

const Root = ({ history, store }) => (
  <Provider store={store}>
    <Router history={history}>
      {configureRoutes(store)}
    </Router>
  </Provider>
);

Root.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  history: PropTypes.object,
  // eslint-disable-next-line react/forbid-prop-types
  store: PropTypes.object,
};

export default Root;
