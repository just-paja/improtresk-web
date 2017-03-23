import classnames from 'classnames';
import moment from 'moment';
import React, { PropTypes } from 'react';

import HumanTimeRange from '../humanTimeRange';

import styles from './event.css';

const ScheduleEvent = ({
  crossing,
  crossingPosition,
  endAt,
  minHour,
  name,
  performer,
  rowHeight,
  startAt,
  workshops,
}) => {
  const minHeight = Math.max(0.5, moment(endAt).diff(startAt, 'minutes') / 60) * rowHeight;
  const crossingUnit = 100 / (crossing + 1);
  const width = `${crossingUnit - 1}%`;
  const top = (
    (moment(startAt).hours() + (moment(startAt).minutes() / 60)) - minHour
  ) * rowHeight;
  const left = `${crossingPosition * crossingUnit}%`;
  return (
    <div className={styles.container}>
      <div className={styles.boxWrapper} style={{ left, top, width }}>
        <div
          className={classnames(styles.box, {
            [styles.withPerformers]: !!performer,
            [styles.withWorkshops]: !!workshops.length,
          })}
          style={{ minHeight }}
        >
          <div className={styles.boxShell}>
            <div>{name}</div>
            <HumanTimeRange
              start={startAt}
              end={endAt}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

ScheduleEvent.propTypes = {
  crossing: PropTypes.number,
  crossingPosition: PropTypes.number,
  endAt: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  minHour: PropTypes.number.isRequired,
  performer: PropTypes.object,
  rowHeight: PropTypes.number.isRequired,
  startAt: PropTypes.string.isRequired,
  workshops: PropTypes.arrayOf(PropTypes.object).isRequired,
};

ScheduleEvent.defaultProps = {
  crossing: 0,
  crossingPosition: 0,
  performer: null,
};

export default ScheduleEvent;
