import React, { Component, PropTypes } from 'react';

import Navigation from './navigation';

import styles from './app.css';

export default class App extends Component {
  componentWillMount() {
    this.props.onMount();
  }

  render() {
    const { children, years } = this.props;

    return (
      <div className={styles.app}>
        <Navigation years={years} />
        {children}
      </div>
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
