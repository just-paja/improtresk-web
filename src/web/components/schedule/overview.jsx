import moment from 'moment';
import React, { PropTypes } from 'react';

import ScheduleDay from './day';

const ScheduleOverview = ({
  endAt,
  startAt,
  events,
  rowHeight,
}) => {
  const days = [];
  const currentDate = moment(startAt);

  while (currentDate.isBefore(endAt) || currentDate.isSame(endAt)) {
    const dayEvents = events.filter(event =>
      currentDate.isSame(event.startAt, 'day') ||
      currentDate.isSame(event.endAt, 'day')
    );
    days.push(
      <ScheduleDay
        date={currentDate.utc().format(moment.RFC_8601)}
        events={dayEvents}
        rowHeight={rowHeight}
      />
    );
    currentDate.add(1, 'day');
  }

  return (
    <div>
      {days}
    </div>
  );
};

ScheduleOverview.propTypes = {
  endAt: PropTypes.string.isRequired,
  startAt: PropTypes.string.isRequired,
  events: PropTypes.arrayOf(PropTypes.object).isRequired,
  rowHeight: PropTypes.number.isRequired,
};

export default ScheduleOverview;
