import Grid from 'react-bootstrap/lib/Grid';
import React, { Component, PropTypes } from 'react';

import Navigation from './navigation';

import './app.css';

export default class App extends Component {
  componentWillMount() {
    this.props.onMount();
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
  onMount: PropTypes.func.isRequired,
  years: PropTypes.arrayOf(PropTypes.object),
};
