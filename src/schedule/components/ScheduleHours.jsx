import PropTypes from 'prop-types'
import React from 'react'

import ScheduleHour from './ScheduleHour'

import { getNumberRange, unshiftHour } from './range'

import styles from './ScheduleHours.css'

const ScheduleHours = ({ max, min, rowHeight, timeSkips }) => {
  const hours = getNumberRange(min, max)
    .filter(hour => timeSkips.indexOf(hour) === -1)
    .map(hour => (
      <ScheduleHour
        key={hour}
        hour={`${unshiftHour(hour)}:00`}
        rowHeight={rowHeight}
      />
    ))
  return (
    <div className={styles.list}>{hours}</div>
  )
}

ScheduleHours.propTypes = {
  max: PropTypes.number.isRequired,
  min: PropTypes.number.isRequired,
  rowHeight: PropTypes.number.isRequired,
  timeSkips: PropTypes.arrayOf(PropTypes.number)
}

ScheduleHours.defaultProps = {
  timeSkips: []
}

export default ScheduleHours
