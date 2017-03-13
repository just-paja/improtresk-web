import classnames from 'classnames';
import React, { PropTypes } from 'react';

import Prop from './prop';

import styles from './workshopSummaryOneLine.css';

const WorkshopSummaryOneLine = ({ capacity, hideCapacity, name, lectors }) => (
  <div>
    <strong>{name}</strong><br />
    <ul className={classnames('list-unstyled', styles.list)}>
      <Prop label="Lektoři">
        {lectors
          .map(lectorPosition => lectorPosition.lector.name)
          .join(', ')}
      </Prop>
      {hideCapacity ? null : <Prop label="Kapacita">{capacity}</Prop>}
    </ul>
  </div>
);

WorkshopSummaryOneLine.propTypes = {
  capacity: PropTypes.number,
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
  capacity: null,
  hideCapacity: false,
};

export default WorkshopSummaryOneLine;
