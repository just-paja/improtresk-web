import React, { PropTypes } from 'react';

const WorkshopSummaryOneLine = ({ name, lectors }) => (
  <div>
    {name}:
    {' '}
    {
      lectors
        .map(lectorAssignment => `${lectorAssignment.lector.name} (${lectorAssignment.role})`)
        .join(', ')
    }
  </div>
);

WorkshopSummaryOneLine.propTypes = {
  lectors: PropTypes.arrayOf(PropTypes.shape({
    lector: PropTypes.shape({
      name: PropTypes.tring,
    }),
    role: PropTypes.string,
  })).isRequired,
  name: PropTypes.string.isRequired,
};

export default WorkshopSummaryOneLine;
