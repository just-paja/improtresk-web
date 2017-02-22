import moment from 'moment';
import React, { Component, PropTypes } from 'react';

import styles from './countdown.css';

export default class Countdown extends Component {
  componentDidMount() {
    this.interval = setInterval(() => {
      this.setState({});
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    const { date } = this.props;
    const duration = moment.duration(moment(date).diff(moment()));
    return (
      <div className={styles.countdown}>
        Zbývá {duration.humanize()}
      </div>
    );
  }
}

Countdown.propTypes = {
  date: PropTypes.string.isRequired,
};
