import React, { PropTypes } from 'react';
import { Grid } from 'react-bootstrap';

import Navigation from './navigation';

import './app.css';

const App = ({ children, years }) => (
  <Grid className="improtresk-app">
    <Navigation years={years} />
    {children}
  </Grid>
);

App.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]),
  years: PropTypes.arrayOf(PropTypes.object),
};

export default App;
