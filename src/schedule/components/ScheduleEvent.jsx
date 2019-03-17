import classnames from 'classnames'
import moment from 'moment'
import PropTypes from 'prop-types'
import React from 'react'

import HumanTimeRange from '../../components/HumanTimeRange'

import styles from './ScheduleEvent.css'

const getEventPosition = (startAt, minHour, timeSkips) => {
  const start = moment(startAt)
  return (
    (start.hours() + (start.minutes() / 60)) -
    minHour -
    timeSkips.filter(skip => skip < start.hours()).length
  )
}

const ScheduleEvent = ({
  crossing,
  crossingPosition,
  endAt,
  locationName,
  minHour,
  name,
  performer,
  rowHeight,
  startAt,
  workshops,
  timeSkips
}) => {
  const minHeight = Math.max(0.5, moment(endAt).diff(startAt, 'minutes') / 60) * rowHeight
  const crossingUnit = 100 / (crossing + 1)
  const width = `${crossingUnit - 1}%`
  const top = getEventPosition(startAt, minHour, timeSkips) * rowHeight
  const left = `${crossingPosition * crossingUnit}%`
  const image = performer && performer.frontImage
    ? performer.frontImage : null
  const bgStyle = {}

  if (image) {
    bgStyle.backgroundImage = `url(${image})`
  }

  return (
    <div className={styles.container}>
      <div className={styles.boxWrapper} style={{ left, top, width }}>
        <div
          className={classnames(styles.box, {
            [styles.withPerformers]: !!performer,
            [styles.withPerformerPhoto]: !!image,
            [styles.withWorkshops]: !!workshops.length
          })}
          style={{ minHeight }}
        >
          <div className={styles.boxOverlay} style={bgStyle} />
          <div className={styles.boxShell}>
            <div>
              <div>{name}</div>
              <small>
                <HumanTimeRange
                  start={startAt}
                  end={endAt}
                />
                {locationName ? <span>{', '}{locationName}</span> : null}
              </small>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

ScheduleEvent.propTypes = {
  crossing: PropTypes.number,
  crossingPosition: PropTypes.number,
  endAt: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  locationName: PropTypes.string,
  minHour: PropTypes.number.isRequired,
  performer: PropTypes.object,
  rowHeight: PropTypes.number.isRequired,
  startAt: PropTypes.string.isRequired,
  timeSkips: PropTypes.arrayOf(PropTypes.number),
  workshops: PropTypes.arrayOf(PropTypes.object).isRequired
}

ScheduleEvent.defaultProps = {
  crossing: 0,
  crossingPosition: 0,
  locationName: null,
  performer: null,
  timeSkips: []
}

export default ScheduleEvent
