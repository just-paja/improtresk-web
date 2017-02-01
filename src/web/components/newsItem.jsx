import React, { PropTypes } from 'react';

import PermaLink from './permaLink';

const NewsItem = ({ id, name }) => (
  <div>
    <PermaLink id={id} title={name} to="news:item">
      <strong>{name}</strong>
    </PermaLink>
  </div>
);

NewsItem.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
};

export default NewsItem;
