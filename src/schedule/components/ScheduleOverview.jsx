import Alert from 'reactstrap/lib/Alert';
import classnames from 'classnames';
import Col from 'reactstrap/lib/Col';
import moment from 'moment';
import PropTypes from 'prop-types';
import React from 'react';
import Row from 'reactstrap/lib/Row';

import { Year } from '../../proptypes';

import Message from '../../containers/Message';
import ScheduleHours from './ScheduleHours';
import ScheduleDay from './ScheduleDay';

import styles from './ScheduleOverview.css';

const ScheduleOverview = ({
  year,
  events,
  rowHeight,
}) => {
  if (events.length === 0) {
    return <Alert color="info"><Message name="schedule.notReady" /></Alert>;
  }

  const days = [];
  const currentDate = moment(year.startDate);
  let minHour;
  let maxHour;

  events.forEach((event) => {
    const eventStartAt = moment(event.startAt);
    const eventEndAt = moment(event.endAt);
    if (!minHour || minHour > eventStartAt.hours()) {
      minHour = eventStartAt.hours();
    }
    if (!maxHour || maxHour < eventEndAt.hours()) {
      maxHour = eventEndAt.hours();
    }
  });

  minHour = Math.max(0, minHour - 1);
  maxHour = Math.min(23, maxHour + 1);

  while (currentDate.isBefore(year.endDate) || currentDate.isSame(year.endDate)) {
    const dayEvents = events.filter(event => (
      currentDate.isSame(event.startAt, 'day') ||
      currentDate.isSame(event.endAt, 'day')
    ));
    const dateFormatted = currentDate.format(moment.RFC_8601);
    days.push((
      <Col xs={12} sm={6} md={3} key={dateFormatted} className={styles.day}>
        <ScheduleDay
          date={dateFormatted}
          events={dayEvents}
          maxHour={maxHour}
          minHour={minHour}
          rowHeight={rowHeight}
        />
      </Col>
    ));
    currentDate.add(1, 'day');
  }

  return (
    <div className={styles.container}>
      <Row className={styles.agenda}>
        <Col sm={0} md={1} className={classnames(styles.hours, styles.hourStretch, 'd-none', 'd-md-block')}>
          <ScheduleHours
            max={maxHour}
            min={minHour}
            rowHeight={rowHeight}
          />
        </Col>
        <Col sm={0} md={1} className={classnames(styles.hours, styles.hoursOverlay, 'd-none', 'd-md-block')}>
          <ScheduleHours
            max={maxHour}
            min={minHour}
            rowHeight={rowHeight}
          />
        </Col>
        <Col sm={12} md={11} className={styles.days}>
          <Row className={styles.daysOverlay}>
            {days}
          </Row>
        </Col>
      </Row>
    </div>
  );
};

ScheduleOverview.propTypes = {
  events: PropTypes.arrayOf(PropTypes.object).isRequired,
  rowHeight: PropTypes.number,
  year: Year.isRequired,
};

ScheduleOverview.defaultProps = {
  rowHeight: 64,
};

export default ScheduleOverview;
