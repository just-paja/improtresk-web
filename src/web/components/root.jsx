import Analytics from 'react-ga';
import React, { PropTypes } from 'react';

import { Router } from 'react-router';
import { Provider } from 'react-redux';

import 'bootswatch/sandstone/bootstrap.min.css';

import configureRoutes from '../routes';

Analytics.initialize('UA-40099806-8');

const logPage = () => {
  Analytics.set({ page: window.location.pathname });
  Analytics.pageview(window.location.pathname);
};

const Root = ({ history, store }) => (
  <Provider store={store}>
    <Router history={history} onUpdate={logPage}>
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
