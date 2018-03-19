import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
import React from 'react';

import { Year } from '../proptypes';

const HelmetTitle = ({ title, translate, year }) => {
  const templatedTitle = translate(year ? 'pages.titleYearTemplate' : 'pages.titleTemplate', {
    year: year.year,
  }).replace('%s', title);
  return (
    <Helmet>
      <title>{templatedTitle}</title>
      <meta property="og:title" content={templatedTitle} />
      <meta property="og:description" content={translate('pages.about')} />
    </Helmet>
  );
};

HelmetTitle.propTypes = {
  year: Year,
  title: PropTypes.string.isRequired,
  translate: PropTypes.func.isRequired,
};

HelmetTitle.defaultProps = {
  year: null,
};

export default HelmetTitle;
