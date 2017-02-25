import React, { PropTypes } from 'react';

import { LinkContainer } from 'react-router-bootstrap';
import { remove } from 'diacritics';

import { reverse } from '../routes';

const transformToSlug = str =>
  remove(str)
    .replace(/[\s-]+/g, '-')
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, '')
    .substr(0, 48);

const PermaLink = ({ id, children, title, to, routeParams = {}, ...other }) => (
  <LinkContainer
    to={reverse(to, {
      ...routeParams,
      slug: `${transformToSlug(title)}-${id}`,
    })}
    {...other}
  >{children}</LinkContainer>
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
