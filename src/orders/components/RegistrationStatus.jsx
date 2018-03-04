import Alert from 'reactstrap/lib/Alert';
import moment from 'moment-timezone';
import PropTypes from 'prop-types';
import React from 'react';

import { Order } from '../../proptypes';

import SignupCountdown from '../../years/containers/SignupCountdown';
import Message from '../../containers/Message';
import RegisterButton from './RegisterButton';
import RegistrationDetails from './RegistrationDetails';

const RegistrationStatus = ({
  activeOrder,
  registrationsCloseDate,
}) => {
  if (!activeOrder) {
    if (!moment().isBefore(registrationsCloseDate)) {
      return (
        <Alert color="warning">
          <Message name="orders.registrationClosed" />
        </Alert>
      );
    }
    return (
      <div className="text-center">
        <Alert color="warning">
          <Message name="orders.notRegisteredToWorkshop" />
        </Alert>
        <p><SignupCountdown /></p>
        <RegisterButton />
      </div>
    );
  }

  return <RegistrationDetails order={activeOrder} />;
};

RegistrationStatus.propTypes = {
  activeOrder: Order,
  registrationsCloseDate: PropTypes.string.isRequired,
};

RegistrationStatus.defaultProps = {
  activeOrder: null,
};

export default RegistrationStatus;
