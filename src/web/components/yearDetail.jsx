import classnames from 'classnames';
import React, { PropTypes } from 'react';

import HumanDateRange from './humanDateRange';
import SignupButton from './signupButton';
import styles from './yearDetail.css';

const YearDetail = ({ current, endDate, startDate, startSignupsAt, topic, year }) => (
  <div className={classnames('text-center', styles.container)}>
    <div className={styles.textOverlay}>
      <div className={styles.textOverlayHorizontalLimit}>
        <div className={styles.textOverlayBackground} />
      </div>
    </div>
    <div className={styles.text}>
      <h1>
        <span className={styles.year}>Improtřesk {year}</span>
        <small className={styles.topic}><i>{topic}</i></small>
      </h1>
      <div className={styles.upcomingDate}>
        <HumanDateRange
          end={endDate}
          start={startDate}
        />
      </div>
    </div>
    {current ? (
      <div className={styles.buttons}>
        <SignupButton
          startAt={startSignupsAt}
          endAt={startDate}
          alreadyFull={false}
        />
      </div>
    ) : (
      <p className={styles.text}>Sledujte novinky na stránkách Improtřesku</p>
    )}
  </div>
);

YearDetail.propTypes = {
  current: PropTypes.bool,
  endDate: PropTypes.string.isRequired,
  startDate: PropTypes.string.isRequired,
  startSignupsAt: PropTypes.string,
  topic: PropTypes.string.isRequired,
  year: PropTypes.string.isRequired,
};

YearDetail.defaultProps = {
  current: false,
  startSignupsAt: null,
};

export default YearDetail;
