import PropTypes from 'prop-types';
import React from 'react';

import { LinkContainer as BSContainer } from 'react-router-bootstrap';

import { reverse } from '../routeTable';

const LinkContainer = ({ children, lang, to, dispatch, routeParams, ...other }) => (
  <BSContainer
    to={reverse(lang, to, {
      ...routeParams,
    })}
    {...other}
  >
    {children}
  </BSContainer>
);

LinkContainer.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]),
  lang: PropTypes.string.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  dispatch: PropTypes.any,
  // eslint-disable-next-line react/forbid-prop-types
  routeParams: PropTypes.object,
  to: PropTypes.string.isRequired,
};

LinkContainer.defaultProps = {
  children: null,
  dispatch: null,
  routeParams: null,
};

export default LinkContainer;
