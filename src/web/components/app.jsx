import moment from 'moment';
import React, { Component, PropTypes } from 'react';

import AppErrors from './appErrors';
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
      errors,
      host,
      participant,
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
        <Navigation
          currentYear={currentYear}
          participant={participant}
          years={years}
        />
        <ProgressBar activeRequests={activeRequests} />
        {errors.length ? <AppErrors errors={errors} /> : children}
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
    year: PropTypes.string,
  }),
  errors: PropTypes.arrayOf(String).isRequired,
  host: PropTypes.string,
  ready: PropTypes.bool,
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }).isRequired,
  participant: PropTypes.object,
  onMount: PropTypes.func.isRequired,
  years: PropTypes.arrayOf(PropTypes.object),
};

App.defaultProps = {
  activeRequests: 0,
  children: null,
  currentYear: null,
  host: null,
  participant: null,
  ready: false,
  route: null,
  years: null,
};

export default App;
