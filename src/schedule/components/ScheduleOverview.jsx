import Alert from 'reactstrap/lib/Alert'
import classnames from 'classnames'
import Col from 'reactstrap/lib/Col'
import moment from 'moment'
import PropTypes from 'prop-types'
import React from 'react'
import Row from 'reactstrap/lib/Row'

import { Year } from '../../proptypes'
import { getNumberRange, isInEvent, shiftHour } from './range'

import Message from '../../containers/Message'
import ScheduleHours from './ScheduleHours'
import ScheduleDay from './ScheduleDay'

import styles from './ScheduleOverview.css'

const getMinHour = events => Math.max(
  0,
  events
    .map(event => shiftHour(moment(event.startAt).hours()))
    .reduce((min, hour) => min > hour ? hour : min)
)

const getMaxHour = events => (
  events
    .map(event => shiftHour(moment(event.endAt).hours()))
    .reduce((max, hour) => max < hour ? hour : max)
) - 1

const getTimeSkips = (events, minHour, maxHour) =>
  getNumberRange(minHour, maxHour)
    .filter(hour => !events.some(isInEvent(hour)))

const ScheduleOverview = ({
  year,
  events,
  rowHeight
}) => {
  if (events.length === 0) {
    return <Alert color='info'><Message name='schedule.notReady' /></Alert>
  }

  const days = []
  const currentDate = moment(year.startDate)
  const minHour = getMinHour(events)
  const maxHour = getMaxHour(events)
  const timeSkips = getTimeSkips(events, minHour, maxHour)
  const dayLength = Math.abs(currentDate.diff(year.endDate, 'days')) + 1

  while (!currentDate.isAfter(year.endDate)) {
    const dayEvents = events.filter(event => currentDate.isSame(event.startAt, 'day'))
    const dateFormatted = currentDate.format(moment.RFC_8601)
    days.push((
      <Col
        className={styles.day}
        key={dateFormatted}
        lg={12 / dayLength}
        xs={12}
      >
        <ScheduleDay
          date={dateFormatted}
          events={dayEvents}
          maxHour={maxHour}
          minHour={minHour}
          rowHeight={rowHeight}
          timeSkips={timeSkips}
        />
      </Col>
    ))
    currentDate.add(1, 'day')
  }

  return (
    <div className={styles.container}>
      <Row className={styles.agenda}>
        <ScheduleHours
          max={maxHour}
          min={minHour}
          rowHeight={rowHeight}
          timeSkips={timeSkips}
        />
        <Col sm={12} lg={{ offset: 1, size: 11 }} className={styles.days}>
          <Row className={styles.daysOverlay}>
            {days}
          </Row>
        </Col>
      </Row>
    </div>
  )
}

ScheduleOverview.propTypes = {
  events: PropTypes.arrayOf(PropTypes.object).isRequired,
  rowHeight: PropTypes.number,
  year: Year.isRequired
}

ScheduleOverview.defaultProps = {
  rowHeight: 64
}

export default ScheduleOverview
