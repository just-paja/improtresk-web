import Col from 'react-bootstrap/lib/Col';
import moment from 'moment';
import React, { PropTypes } from 'react';
import Row from 'react-bootstrap/lib/Row';

import ScheduleHours from './hours';
import ScheduleDay from './day';

import styles from './overview.css';

const ScheduleOverview = ({
  endAt,
  startAt,
  events,
  rowHeight,
}) => {
  const days = [];
  const currentDate = moment(startAt);
  let minHour;
  let maxHour;

  events.forEach((event) => {
    const eventStartAt = moment(event.startAt).utc();
    const eventEndAt = moment(event.endAt).utc();
    if (!minHour || minHour > eventStartAt.hours()) {
      minHour = eventStartAt.hours();
    }
    if (!maxHour || maxHour < eventEndAt.hours()) {
      maxHour = eventEndAt.hours();
    }
  });

  while (currentDate.isBefore(endAt) || currentDate.isSame(endAt)) {
    const dayEvents = events.filter(event =>
      currentDate.isSame(event.startAt, 'day') ||
      currentDate.isSame(event.endAt, 'day')
    );
    const dateFormatted = currentDate.utc().format(moment.RFC_8601);
    days.push(
      <Col md={4} lg={3} key={dateFormatted}>
        <ScheduleDay
          date={dateFormatted}
          events={dayEvents}
          maxHour={maxHour}
          minHour={minHour}
          rowHeight={rowHeight}
        />
      </Col>
    );
    currentDate.add(1, 'day');
  }

  return (
    <div>
      <div className={styles.hours}>
        <ScheduleHours max={maxHour} min={minHour} />
      </div>
      <Row className={styles.days}>{days}</Row>
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
