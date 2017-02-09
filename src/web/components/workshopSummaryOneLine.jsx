import React, { PropTypes } from 'react';

const WorkshopSummaryOneLine = ({ name, lectors }) => (
  <div>
    {name}:
    {' '}
    {
      lectors
        .map(lectorAssignment => `${lectorAssignment.lector} (${lectorAssignment.role})`)
        .join(', ')
    }
  </div>
);

WorkshopSummaryOneLine.propTypes = {
  lectors: PropTypes.arrayOf(PropTypes.shape({
    lector: PropTypes.string,
    role: PropTypes.string,
  })).isRequired,
  name: PropTypes.string.isRequired,
};

export default WorkshopSummaryOneLine;
