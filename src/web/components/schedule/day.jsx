import moment from 'moment';
import React, { PropTypes } from 'react';

import ScheduleHour from './hour';
import ScheduleEvent from './event';

const ScheduleDay = ({
  date,
  events,
  maxHour,
  minHour,
  rowHeight,
}) => {
  const hours = [];
  for (let i = minHour; i <= maxHour; i += 1) {
    hours.push(<ScheduleHour hour={`${i}:00`} />);
  }

  return (
    <div>
      <div>{moment(date).format('dddd')}</div>
      <div>{hours}</div>
      <div>
        {events.map(event => (
          <ScheduleEvent
            endAt={event.endAt}
            name={event.name}
            performer={event.performer}
            rowHeight={rowHeight}
            startAt={event.startAt}
            workshops={event.workshops}
          />
        ))}
      </div>
    </div>
  );
};

ScheduleDay.propTypes = {
  date: PropTypes.string.isRequired,
  events: PropTypes.arrayOf(PropTypes.object).isRequired,
  maxHour: PropTypes.number.isRequired,
  minHour: PropTypes.number.isRequired,
  rowHeight: PropTypes.number.isRequired,
};

export default ScheduleDay;
