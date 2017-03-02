import moment from 'moment';
import React, { Component, PropTypes } from 'react';

import AppHelmet from './appHelmet';
import Navigation from './navigation';
import Footer from './footer';
import ProgressBar from './progressBar';

import styles from './app.css';

moment.locale('cs');

class App extends Component {
  componentWillMount() {
    this.props.onMount();
  }

  render() {
    const {
      activeRequests,
      children,
      currentYear,
      host,
      ready,
      location: { pathname },
      years,
    } = this.props;

    const defaultTitle = 'Festival divadelní improvizace';
    const titleTemplate = currentYear ? `%s - Improtřesk ${currentYear.year}` : '%s - Improtřesk';

    if (!ready) {
      return null;
    }

    return (
      <div className={styles.app}>
        <AppHelmet
          defaultTitle={defaultTitle}
          host={host}
          pathname={pathname}
          titleTemplate={titleTemplate}
        />
        <Navigation currentYear={currentYear} years={years} />
        <ProgressBar activeRequests={activeRequests} />
        {children}
        <Footer partners={[]} />
      </div>
    );
  }
}

App.propTypes = {
  activeRequests: PropTypes.number,
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]),
  currentYear: PropTypes.shape({
    year: PropTypes.number,
  }).isRequired,
  host: PropTypes.string,
  ready: PropTypes.bool,
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }).isRequired,
  onMount: PropTypes.func.isRequired,
  years: PropTypes.arrayOf(PropTypes.object),
};

App.defaultProps = {
  activeRequests: 0,
  children: null,
  currentYear: null,
  host: null,
  ready: false,
  route: null,
  years: null,
};

export default App;
