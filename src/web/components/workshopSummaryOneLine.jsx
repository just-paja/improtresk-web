import React, { PropTypes } from 'react';

const WorkshopSummaryOneLine = ({ name, lectors }) => (
  <div>
    <strong>{name}</strong><br />
    Lektoři:{' '}
    {lectors
      .map(lectorPosition => lectorPosition.lector.name)
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
