import React, { PropTypes } from 'react';

import HumanDateRange from './humanDateRange';

const YearDetail = ({ endAt, startAt, topic, year }) => (
  <div className="text-center">
    <h1>Improtřesk {year} <small>{topic}</small></h1>
    <div>
      <HumanDateRange
        end={endAt}
        start={startAt}
      />
    </div>
  </div>
);

YearDetail.propTypes = {
  endAt: PropTypes.string.isRequired,
  startAt: PropTypes.string.isRequired,
  topic: PropTypes.string.isRequired,
  year: PropTypes.string.isRequired,
};

export default YearDetail;
