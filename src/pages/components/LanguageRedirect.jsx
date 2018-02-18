import PropTypes from 'prop-types';
import React from 'react';

import { Redirect } from 'react-router';
import { reverse } from '../../routeTable';

const LanguageRedirect = ({ lang }) => (
  <Redirect to={reverse(lang, 'home')} />
);

LanguageRedirect.propTypes = {
  lang: PropTypes.string.isRequired,
};

export default LanguageRedirect;
