import React, { PropTypes } from 'react';

import ImageHeader from './imageHeader';
import PermaLink from './permaLink';

import styles from './performerListItem.css';

const PerformerListItem = ({ id, frontImage, name }) => (
  <PermaLink
    className={styles.container}
    id={id}
    title={name}
    to="performers:item"
  >
    <ImageHeader
      className={styles.header}
      cover
      image={frontImage || '/static/theme/2017/performer-mask.jpg'}
    />
    <div className={styles.title}>
      <span className={styles.text}>{name}</span>
    </div>
  </PermaLink>
);

PerformerListItem.propTypes = {
  id: PropTypes.number.isRequired,
  frontImage: PropTypes.string,
  name: PropTypes.string.isRequired,
};

PerformerListItem.defaultProps = {
  frontImage: null,
};

export default PerformerListItem;
