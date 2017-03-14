import React, { PropTypes } from 'react';

import PermaLink from './permaLink';

const PerformerListItem = ({ id, name }) => (
  <PermaLink id={id} title={name} to="performers:item">
    <big>{name}</big>
  </PermaLink>
);

PerformerListItem.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
};

export default PerformerListItem;
