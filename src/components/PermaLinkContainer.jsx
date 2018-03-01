import PropTypes from 'prop-types';
import React from 'react';

import { ResourceId } from 'react-saga-rest/lib/proptypes';
import { remove } from 'diacritics';

import LinkContainer from '../containers/LinkContainer';

import { Children } from '../proptypes';

const transformToSlug = str =>
  remove(str)
    .replace(/[\s-]+/g, '-')
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, '')
    .substr(0, 48);

const PermaLinkContainer = ({ id, children, title, to, routeParams, ...other }) => (
  <LinkContainer
    to={to}
    routeParams={{
      ...routeParams,
      slug: `${transformToSlug(title)}-${id}`,
    }}
    {...other}
  >
    {children}
  </LinkContainer>
);

PermaLinkContainer.propTypes = {
  children: Children,
  id: ResourceId.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  routeParams: PropTypes.object,
  title: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
};

PermaLinkContainer.defaultProps = {
  children: null,
  routeParams: null,
};

export default PermaLinkContainer;
