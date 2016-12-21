import React, { PropTypes } from 'react';

import HumanDate from './humanDate';

const HumanDateRange = ({ end, start }) => (
  <span>
    <HumanDate date={start} showYear={false} />
    {' '}-{' '}
    <HumanDate date={end} />
  </span>
);

HumanDateRange.propTypes = {
  end: PropTypes.string.isRequired,
  start: PropTypes.string.isRequired,
};

export default HumanDateRange;
