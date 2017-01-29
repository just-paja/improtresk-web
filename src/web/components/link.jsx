import React, { PropTypes } from 'react';

import { Link as RouterLink } from 'react-router';
import { reverse } from '../routes';

const Link = ({ to, params, ...other }) =>
  <RouterLink to={reverse(to, params)} {...other} />;

Link.propTypes = {
  to: PropTypes.string.isRequired,
  params: PropTypes.object,
};

Link.defaultProps = {
  params: null,
};

export default Link;
