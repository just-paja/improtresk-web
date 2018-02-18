import PropTypes from 'prop-types';
import React from 'react';

import { remove } from 'diacritics';

import Link from '../containers/Link';

const transformToSlug = str =>
  remove(str)
    .replace(/[\s-]+/g, '-')
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, '')
    .substr(0, 48);

const PermaLink = ({ id, children, title, to, routeParams, ...other }) => (
  <Link
    to={to}
    params={{
      ...routeParams,
      slug: `${transformToSlug(title)}-${id}`,
    }}
    {...other}
  >
    {children}
  </Link>
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
  routeParams: PropTypes.object,
  title: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
};

PermaLink.defaultProps = {
  children: null,
  routeParams: null,
};

export default PermaLink;
