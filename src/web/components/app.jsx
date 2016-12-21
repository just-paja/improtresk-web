import React, { Component, PropTypes } from 'react';
import { Grid } from 'react-bootstrap';

import Navigation from './navigation';

import './app.css';

export default class App extends Component {
  componentDidMount() {
    this.props.onFetchConfig();
  }

  render() {
    const { children, years } = this.props;

    return (
      <Grid className="improtresk-app">
        <Navigation years={years} />
        {children}
      </Grid>
    );
  }
}

App.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]),
  onFetchConfig: PropTypes.func.isRequired,
  years: PropTypes.arrayOf(PropTypes.object),
};
