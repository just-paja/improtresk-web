import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
import React from 'react';

import HelmetTitle from '../containers/HelmetTitle';

const HelmetArticle = ({
  createdAt,
  description,
  name,
  updatedAt,
}) => (
  <div>
    <HelmetTitle title={name} />
    <Helmet>
      <meta property="og:type" content="article" />
      <meta property="og:description" content={description} />
      <meta property="og:published_time" content={createdAt} />
      <meta property="og:modified_time" content={updatedAt} />
    </Helmet>
  </div>
);

HelmetArticle.propTypes = {
  createdAt: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  updatedAt: PropTypes.string.isRequired,
};

export default HelmetArticle;
