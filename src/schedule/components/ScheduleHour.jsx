import PropTypes from 'prop-types'
import React from 'react'

import styles from './ScheduleHour.css'

const ScheduleHour = ({ hour, rowHeight }) => (
  <div style={{ minHeight: rowHeight }}>
    <span className={styles.row}>
      {hour}
    </span>
  </div>
)

ScheduleHour.propTypes = {
  hour: PropTypes.string.isRequired,
  rowHeight: PropTypes.number.isRequired
}

export default ScheduleHour
