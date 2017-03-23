import moment from 'moment';
import React, { PropTypes } from 'react';

import ScheduleEvent from './event';

import styles from './day.css';

const isInDateRange = (dateStr, start, end) => {
  const date = moment(dateStr);
  return (
    (
      date.isAfter(start) ||
      date.isSame(start)
    ) &&
    (
      date.isBefore(end) ||
      date.isSame(end)
    )
  );
};

const getCrossingCount = (event, events) => events
  .filter(otherEvent => (
    event.id !== otherEvent.id &&
    event.endAt !== otherEvent.startAt &&
    event.startAt !== otherEvent.endAt && (
      isInDateRange(otherEvent.startAt, event.startAt, event.endAt) ||
      isInDateRange(otherEvent.endAt, event.startAt, event.endAt, true)
    )
  ))
  .length;

const ScheduleDay = ({
  date,
  events,
  minHour,
  rowHeight,
}) => {
  const crossings = {};

  return (
    <div>
      <div className={styles.header}>{moment(date).format('dddd')}</div>
      <div>
        {events.map((event) => {
          const crossing = getCrossingCount(event, events);
          if (typeof crossings[crossing] === 'undefined') {
            crossings[crossing] = crossing;
          }

          crossings[crossing] += 1;

          return (
            <ScheduleEvent
              crossing={crossing}
              crossingPosition={crossings[crossing] % (crossing + 1)}
              key={event.id}
              endAt={event.endAt}
              minHour={minHour}
              name={event.name}
              performer={event.performer}
              rowHeight={rowHeight}
              startAt={event.startAt}
              workshops={event.workshops}
            />
          );
        })}
      </div>
    </div>
  );
};

ScheduleDay.propTypes = {
  date: PropTypes.string.isRequired,
  events: PropTypes.arrayOf(PropTypes.object).isRequired,
  minHour: PropTypes.number.isRequired,
  rowHeight: PropTypes.number.isRequired,
};

export default ScheduleDay;
