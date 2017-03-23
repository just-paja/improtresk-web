import React, { PropTypes } from 'react';

import styles from './hour.css';

const ScheduleHour = ({ hour, rowHeight }) => (
  <div
    style={{ minHeight: rowHeight }}
    className={styles.row}
  >{hour}</div>
);

ScheduleHour.propTypes = {
  hour: PropTypes.string.isRequired,
  rowHeight: PropTypes.number.isRequired,
};

export default ScheduleHour;
