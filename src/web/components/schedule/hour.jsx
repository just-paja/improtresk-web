import React, { PropTypes } from 'react';

const ScheduleHour = ({ hour }) => (
  <div>{hour}</div>
);

ScheduleHour.propTypes = {
  hour: PropTypes.string.isRequired,
};

export default ScheduleHour;
