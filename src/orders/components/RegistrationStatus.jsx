import Alert from 'reactstrap/lib/Alert';
import CardFooter from 'reactstrap/lib/CardFooter';
import moment from 'moment-timezone';
import PropTypes from 'prop-types';
import Card from 'reactstrap/lib/Card';
import React from 'react';

import { Order } from '../../proptypes';

import Button from '../../components/Button';
import SignupCountdown from '../../years/containers/SignupCountdown';
import Message from '../../containers/Message';
import RegisterButton from './RegisterButton';
import RegistrationDetails from './RegistrationDetails';

const RegistrationStatus = ({
  activeOrder,
  onCancel,
  onConfirm,
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

  return (
    <Card>
      <RegistrationDetails order={activeOrder} />
      {!activeOrder.paid ? (
        <CardFooter>
          <Button
            icon="ban"
            onClick={onCancel}
          >
            Zrušit objednávku
          </Button>
          {!activeOrder.confirmed ? (
            <Button
              className="pull-right"
              color="primary"
              onClick={onConfirm}
            >
              Potvrdit objednávku
            </Button>
          ) : null}
        </CardFooter>
      ) : null}
    </Card>
  );
};

RegistrationStatus.propTypes = {
  activeOrder: Order,
  onCancel: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  registrationsCloseDate: PropTypes.string.isRequired,
};

RegistrationStatus.defaultProps = {
  activeOrder: null,
};

export default RegistrationStatus;
