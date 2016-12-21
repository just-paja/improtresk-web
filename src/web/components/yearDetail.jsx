import React, { PropTypes } from 'react';

import HumanDateRange from './humanDateRange';
import SignupButton from './signupButton';
import styles from './yearDetail.css';

const YearDetail = ({ endAt, startAt, startSignupsAt, topic, year }) => (
  <div className="text-center">
    <h1>Improtřesk {year} <small className={styles.topic}><i>{topic}</i></small></h1>
    <div className={styles.upcomingDate}>
      <HumanDateRange
        end={endAt}
        start={startAt}
      />
    </div>
    <SignupButton
      startAt={startSignupsAt}
      endAt={startAt}
      alreadyFull={false}
    />
  </div>
);

YearDetail.propTypes = {
  endAt: PropTypes.string.isRequired,
  startAt: PropTypes.string.isRequired,
  startSignupsAt: PropTypes.string.isRequired,
  topic: PropTypes.string.isRequired,
  year: PropTypes.string.isRequired,
};

export default YearDetail;
