import classnames from 'classnames';
import React, { PropTypes } from 'react';

import Prop from './prop';

import styles from './workshopSummaryOneLine.css';

const WorkshopSummaryOneLine = ({ capacity, name, lectors }) => (
  <div>
    <strong>{name}</strong><br />
    <ul className={classnames('list-unstyled', styles.list)}>
      <Prop label="Lektoři">
        {lectors
          .map(lectorPosition => lectorPosition.lector.name)
          .join(', ')}
      </Prop>
      <Prop label="Kapacita">{capacity}</Prop>
    </ul>
  </div>
);

WorkshopSummaryOneLine.propTypes = {
  capacity: PropTypes.number,
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
};

export default WorkshopSummaryOneLine;
