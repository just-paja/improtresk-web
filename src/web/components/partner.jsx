import React, { PropTypes } from 'react';

const Partner = ({ name, logo }) => (
  <div>
    <img alt={`${name}, logo`} src={{ logo }} />
  </div>
);

Partner.propTypes = {
  name: PropTypes.string.isRequired,
  logo: PropTypes.string.isRequired,
};

export default Partner;
