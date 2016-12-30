import React, { Component, PropTypes } from 'react';

import Navigation from './navigation';
import Footer from './footer';

import styles from './app.css';

export default class App extends Component {
  componentWillMount() {
    this.props.onMount();
  }

  render() {
    const { children, currentYear, years } = this.props;

    return (
      <div className={styles.app}>
        <Navigation currentYear={currentYear} years={years} />
        {children}
        <Footer partners={[]} />
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]),
  currentYear: PropTypes.object,
  onMount: PropTypes.func.isRequired,
  years: PropTypes.arrayOf(PropTypes.object),
};
