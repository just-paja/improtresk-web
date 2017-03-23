import React, { PropTypes } from 'react';

import ScheduleHour from './hour';

import styles from './hours.css';

const ScheduleHours = ({ max, min, rowHeight }) => {
  const hours = [];
  for (let i = min; i <= max; i += 1) {
    hours.push(
      <ScheduleHour
        key={`${i}:00`}
        hour={`${i}:00`}
        rowHeight={rowHeight}
      />
    );
  }
  return (
    <div className={styles.list}>{hours}</div>
  );
};

ScheduleHours.propTypes = {
  max: PropTypes.number.isRequired,
  min: PropTypes.number.isRequired,
  rowHeight: PropTypes.number.isRequired,
};

export default ScheduleHours;
