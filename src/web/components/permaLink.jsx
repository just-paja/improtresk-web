import React, { PropTypes } from 'react';

import Link from './link';

const PermaLink = ({ id, children, title, to, routeParams }) => (
  <Link
    to={to}
    params={{
      ...routeParams,
      slug: `${title}-${id}`,
    }}
  >{children}</Link>
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
  // eslint-disable-next-line react/forbid-prop-types
  routeParams: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
};

export default PermaLink;
