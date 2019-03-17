import PropTypes from 'prop-types'
import React from 'react'

import ScheduleHour from './ScheduleHour'
import ScheduleSkipper from './ScheduleSkipper'

import { getNumberRange, unshiftHour } from './range'

import styles from './ScheduleHours.css'

const skipper = 'skip'

const ScheduleHours = ({ max, min, rowHeight, timeSkips }) => {
  const hours = getNumberRange(min, max)
    .reduce((hours, hour) => [...hours, timeSkips.indexOf(hour) === -1 ? hour : skipper], [])
    .filter((hour, index, source) => hour !== skipper || source[index - 1] !== skipper)
    .map((hour, index) => hour === skipper ? <ScheduleSkipper key={`${hour}-${index}`} /> : (
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
