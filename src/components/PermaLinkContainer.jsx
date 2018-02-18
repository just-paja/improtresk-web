import PropTypes from 'prop-types';
import React from 'react';

import { ResourceId } from 'react-saga-rest/lib/proptypes';
import { LinkContainer } from 'react-router-bootstrap';
import { remove } from 'diacritics';

import { reverse } from '../routeTable';
import { Children } from '../proptypes';

const transformToSlug = str =>
  remove(str)
    .replace(/[\s-]+/g, '-')
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, '')
    .substr(0, 48);

const PermaLink = ({ id, children, lang, title, to, routeParams, ...other }) => (
  <LinkContainer
    to={reverse(lang, to, {
      ...routeParams,
      slug: `${transformToSlug(title)}-${id}`,
    })}
    {...other}
  >
    {children}
  </LinkContainer>
);

PermaLink.propTypes = {
  children: Children,
  id: ResourceId.isRequired,
  lang: PropTypes.string.isRequired,
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
