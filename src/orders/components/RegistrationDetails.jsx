// import PropTypes from 'prop-types';
import React from 'react';

import { Order } from '../../proptypes';

const RegistrationDetails = ({
  order,
}) => (
  <div>
    {order.id}
  </div>
);

RegistrationDetails.propTypes = {
  order: Order.isRequired,
};

RegistrationDetails.defaultProps = {
};

export default RegistrationDetails;
