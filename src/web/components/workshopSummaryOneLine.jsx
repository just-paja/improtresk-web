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
        <Prop key="capacity" label="Kapacita">{capacity}</Prop>,
        <Prop key="assigned" label="Zaplněné">{assigned === null ? null : `${assigned}`}</Prop>,
        <Prop key="reserved" label="Nezaplacené">{reserved === null ? null : `${reserved}`}</Prop>,
        <Prop key="freeSpots" label="Volná místa">{freeSpots === null ? null : `${freeSpots}`}</Prop>,
      ]}
    </ul>
  </div>
);

WorkshopSummaryOneLine.propTypes = {
  assigned: PropTypes.number,
  capacity: PropTypes.number,
  freeSpots: PropTypes.number,
  hideCapacity: PropTypes.bool,
  lectors: PropTypes.arrayOf(PropTypes.shape({
    lector: PropTypes.shape({
      name: PropTypes.tring,
    }),
    role: PropTypes.string,
  })).isRequired,
  name: PropTypes.string.isRequired,
  reserved: PropTypes.number,
};

WorkshopSummaryOneLine.defaultProps = {
  assigned: null,
  capacity: null,
  freeSpots: null,
  hideCapacity: false,
  reserved: null,
};

export default WorkshopSummaryOneLine;
