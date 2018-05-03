import PropTypes from 'prop-types';
import React from 'react';

import ScheduleHour from './ScheduleHour';

import styles from './ScheduleHours.css';

const shiftHour = hour => (hour > 23 ? hour - 23 : hour);

const ScheduleHours = ({ max, min, rowHeight }) => {
  const hours = [];
  for (let i = min; i <= max; i += 1) {
    hours.push((
      <ScheduleHour
        key={`${shiftHour(i)}:00`}
        hour={`${shiftHour(i)}:00`}
        rowHeight={rowHeight}
      />
    ));
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
