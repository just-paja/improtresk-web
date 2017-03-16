import classnames from 'classnames';
import React, { PropTypes } from 'react';

import Prop from './prop';

import styles from './workshopSummaryOneLine.css';

const WorkshopSummaryOneLine = ({
  assigned,
  capacity,
  freeSpots,
  hideCapacity,
  name,
  lectors,
  reserved,
}) => (
  <div>
    <h3 className={styles.heading}>{name}</h3>
    <ul className={classnames('list-unstyled', styles.list)}>
      <Prop label="Lektoři">
        {lectors
          .map(lectorPosition => lectorPosition.lector.name)
          .join(', ')}
      </Prop>
      {hideCapacity ? null : [
        <Prop label="Volná místa">{freeSpots}/{capacity}</Prop>,
        <Prop label="Potvrzená místa">{assigned}</Prop>,
        <Prop label="Dočasně rezervovaná místa">{reserved}</Prop>,
      ]}
    </ul>
  </div>
);

WorkshopSummaryOneLine.propTypes = {
  assigned: PropTypes.number,
  capacity: PropTypes.number,
  reserved: PropTypes.number,
  freeSpots: PropTypes.number,
  hideCapacity: PropTypes.bool,
  lectors: PropTypes.arrayOf(PropTypes.shape({
    lector: PropTypes.shape({
      name: PropTypes.tring,
    }),
    role: PropTypes.string,
  })).isRequired,
  name: PropTypes.string.isRequired,
};

WorkshopSummaryOneLine.defaultProps = {
  assigned: null,
  capacity: null,
  freeSpots: null,
  hideCapacity: false,
  reserved: null,
};

export default WorkshopSummaryOneLine;
