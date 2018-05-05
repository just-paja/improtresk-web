import FontAwesome from 'react-fontawesome';
import PropTypes from 'prop-types';
import React from 'react';

import Message from '../containers/Message';

const IconMessage = ({ icon, name, data, ...other }) => (
  <span>
    <FontAwesome name={icon} {...other} />
    {' '}
    <Message data={data} name={name} />
  </span>
);

IconMessage.propTypes = {
  data: PropTypes.object,
  icon: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

IconMessage.defaultProps = {
  data: null,
};

export default IconMessage;
