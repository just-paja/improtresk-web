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
  history: PropTypes.object,
  store: PropTypes.object,
};

Root.defaultProps = {
  history: null,
  store: null,
};

export default Root;
