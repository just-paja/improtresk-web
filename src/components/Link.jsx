import PropTypes from 'prop-types';
import React from 'react';

import { Link as RouterLink } from 'react-router-dom';
import { reverse } from '../routeTable';

const Link = ({ lang, to, params, dispatch, ...other }) =>
  <RouterLink to={reverse(lang, to, params)} {...other} />;

Link.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  dispatch: PropTypes.any,
  lang: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
  params: PropTypes.object,
};

Link.defaultProps = {
  dispatch: null,
  params: null,
};

export default Link;
