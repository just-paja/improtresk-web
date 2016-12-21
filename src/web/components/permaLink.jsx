import React, { PropTypes } from 'react';

import { Link } from 'react-router';

const PermaLink = ({ id, children, title }) => (
  <Link to={`${title}-${id}`}>{children}</Link>
);

PermaLink.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]),
  id: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  title: PropTypes.string.isRequired,
};

export default PermaLink;
