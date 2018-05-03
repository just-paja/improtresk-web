import moment from 'moment';
import PropTypes from 'prop-types';
import React from 'react';

import ScheduleEvent from './ScheduleEvent';

import styles from './ScheduleDay.css';

const isInDateRange = (dateStr, start, end, sameStart) => {
  const date = moment(dateStr);
  return (date.isAfter(start) && date.isBefore(end)) || (
    sameStart &&
    date.isSame(start, 'minute')
  );
};

const isInEventRange = (baseEvent, queryEvent) => (
  isInDateRange(queryEvent.startAt, baseEvent.startAt, baseEvent.endAt, true) ||
  isInDateRange(queryEvent.endAt, baseEvent.startAt, baseEvent.endAt)
);

const getCrossings = (event, events) => events
  .filter(otherEvent => event.id !== otherEvent.id && (
    isInEventRange(event, otherEvent) ||
    isInEventRange(otherEvent, event)
  ));

const getCrossingCount = eventCrossings => Math.max(
  eventCrossings.length > 0 ? 1 : 0,
  Math.min(
    eventCrossings.length,
    ...eventCrossings.map(event => getCrossings(event, eventCrossings).length)
  )
);

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
          const eventCrossings = getCrossings(event, events);
          const crossing = getCrossingCount(eventCrossings);
          if (typeof crossings[crossing] === 'undefined') {
            crossings[crossing] = crossing;
          }

          crossings[crossing] += 1;

          return (
            <ScheduleEvent
              crossing={crossing}
              crossingPosition={crossings[crossing] % (crossing + 1)}
              endAt={event.endAt}
              key={event.id}
              locationName={event.locationName}
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
