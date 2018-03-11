import Alert from 'reactstrap/lib/Alert';
import moment from 'moment-timezone';
import PropTypes from 'prop-types';
import Card from 'reactstrap/lib/Card';
import CardBody from 'reactstrap/lib/CardBody';
import React from 'react';

import { Order } from '../../proptypes';

import Button from '../../components/Button';
import SignupCountdown from '../../years/containers/SignupCountdown';
import Message from '../../containers/Message';
import RegisterButton from './RegisterButton';
import RegistrationDetails from './RegistrationDetails';

const RegistrationStatus = ({
  activeOrder,
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
      <CardBody>
        <RegistrationDetails order={activeOrder} />
        {!activeOrder.paid ? (
          <Button
            bsSize={activeOrder.confirmed ? 'small' : null}
            icon="ban"
            onClick={() => {}}
          >
            Zrušit objednávku
          </Button>
        ) : null}
        {!activeOrder.confirmed && !activeOrder.paid ? (
          <Button
            className="pull-right"
            color="primary"
            onClick={onConfirm}
          >
            Potvrdit objednávku
          </Button>
        ) : null}
      </CardBody>
    </Card>
  );
};

RegistrationStatus.propTypes = {
  activeOrder: Order,
  onConfirm: PropTypes.func.isRequired,
  registrationsCloseDate: PropTypes.string.isRequired,
};

RegistrationStatus.defaultProps = {
  activeOrder: null,
};

export default RegistrationStatus;
