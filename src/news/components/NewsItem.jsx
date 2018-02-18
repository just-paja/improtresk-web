import PropTypes from 'prop-types';
import React from 'react';

import PermaLink from '../../components/PermaLink';

const NewsItem = ({ id, name }) => (
  <div>
    <PermaLink id={id} title={name} to="newsDetail">
      <strong>{name}</strong>
    </PermaLink>
  </div>
);

NewsItem.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
};

export default NewsItem;
