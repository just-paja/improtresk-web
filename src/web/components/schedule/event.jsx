import moment from 'moment';
import React, { PropTypes } from 'react';

import Link from '../link';
import PermaLink from '../permaLink';
import HumanTimeRange from '../humanTimeRange';

const ScheduleEvent = ({
  endAt,
  name,
  performer,
  rowHeight,
  startAt,
  workshops,
}) => {
  const height = moment(endAt).diff(startAt, 'hours') * rowHeight;
  return (
    <div style={{ height }}>
      <div>{name}</div>
      <HumanTimeRange
        start={startAt}
        end={endAt}
      />
      {(performer || (workshops && workshops.length)) ? (
        <div>
          <hr />
          <ul className="list-unstyled">
            {performer ? (
              <li>
                <Link to="performers:item" params={{ slug: performer.slug }}>
                  {performer.name}
                </Link>
              </li>
            ) : null }
            {workshops && workshops.map(workshop => (
              <li key={workshop.id}>
                <PermaLink to="workshops:item" id={workshop.id} title={workshop.name}>
                  {workshop.name}
                </PermaLink>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
};

ScheduleEvent.propTypes = {
  endAt: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  performer: PropTypes.object,
  rowHeight: PropTypes.number.isRequired,
  startAt: PropTypes.string.isRequired,
  workshops: PropTypes.arrayOf(PropTypes.object),
};

ScheduleEvent.defaultProps = {
  performer: null,
  workshops: null,
};

export default ScheduleEvent;
