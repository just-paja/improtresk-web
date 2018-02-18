import PropTypes from 'prop-types';
import React from 'react';

import ImageHeader from '../../components/ImageHeader';
import PermaLink from '../../components/PermaLink';

import styles from './PerformerListItem.css';

const PerformerListItem = ({ id, frontImage, name }) => (
  <PermaLink
    className={styles.container}
    id={id}
    title={name}
    to="performerDetail"
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
