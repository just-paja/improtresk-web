import moment from 'moment';
import React, { PropTypes } from 'react';

import ScheduleEvent from './event';

const ScheduleDay = ({
  date,
  events,
  rowHeight,
}) => (
  <div>
    <div>{moment(date).format('dddd')}</div>
    <div>
      {events.map(event => (
        <ScheduleEvent
          key={event.id}
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

ScheduleDay.propTypes = {
  date: PropTypes.string.isRequired,
  events: PropTypes.arrayOf(PropTypes.object).isRequired,
  rowHeight: PropTypes.number.isRequired,
};

export default ScheduleDay;
