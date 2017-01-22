import React, { PropTypes } from 'react';

const WorkshopSummaryOneLine = ({ name, lectorName }) => (
  <div>{lectorName}: {name}</div>
);

WorkshopSummaryOneLine.propTypes = {
  lectorName: PropTypes.string,
  name: PropTypes.string.isRequired,
};

export default WorkshopSummaryOneLine;
