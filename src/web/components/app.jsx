import React, { PropTypes } from 'react';
import { Grid } from 'react-bootstrap';

import Navigation from './navigation';

import './app.css';

const App = ({ children }) => (
  <Grid className="improtresk-app">
    <Navigation />
    {children}
  </Grid>
);

App.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]),
};

export default App;
