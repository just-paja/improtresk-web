import Alert from 'reactstrap/lib/Alert';
import Card from 'reactstrap/lib/Card';
import CardBody from 'reactstrap/lib/CardBody';
import CardFooter from 'reactstrap/lib/CardFooter';
import CardHeader from 'reactstrap/lib/CardHeader';
import moment from 'moment-timezone';
import PropTypes from 'prop-types';
import React from 'react';

import { Order } from '../../proptypes';

import Button from '../../components/Button';
import Flex from '../../components/Flex';
import Message from '../../containers/Message';
import IconMessage from '../../components/IconMessage';
import OrderPaymentStatus from './OrderPaymentStatus';
import OrderStatusLabel from './OrderStatusLabel';
import OrderTimeout from './OrderTimeout';
import PaymentDetails from './PaymentDetails';
import Price from '../../components/Price';
import Prop from '../../components/Prop';
import QrCheckinLink from '../containers/QrCheckinLink';
import RegisterButton from './RegisterButton';
import SignupCountdown from '../../years/containers/SignupCountdown';

const renderOrderStatusProp = (order) => {
  const endsAt = order.reservation ? order.reservation.endsAt : null;
  return (
    <span>
      <OrderStatusLabel {...order} endsAt={endsAt} />
      {order.paid || !endsAt ? null : (
        <span>
          {', '}
          <OrderTimeout endsAt={endsAt} />
        </span>
      )}
    </span>
  );
};

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
    <Card className="mb-4">
      <CardHeader>
        <Flex justify="between">
          <IconMessage icon="info-circle" name="orders.status" />
          {!activeOrder.paid ? (
            <Button
              color="danger"
              icon="ban"
              link
              onClick={onCancel}
            >
              <Message name="orders.cancel" />
            </Button>
          ) : null}
        </Flex>
      </CardHeader>
      <CardBody>
        <ul className="list-unstyled">
          <Prop icon="table" label={<Message name="orders.summary" />}>
            {renderOrderStatusProp(activeOrder)}
          </Prop>
          <Prop icon="street-view" label={<Message name="orders.workshop" />}>
            {activeOrder.workshop ?
              activeOrder.workshop.name :
              <Message name="orders.noWorkshop" />
            }
          </Prop>
          { !activeOrder.paid && activeOrder.confirmed ? (
            <Prop>
              <PaymentDetails
                price={activeOrder.remainingPrice}
                symvar={activeOrder.symvar}
              />
            </Prop>
          ) : null}
        </ul>
        { !activeOrder.confirmed ? (
          <div>
            <big>
              <Message name="orders.totalPrice" />
              {': '}
              <Price price={activeOrder.price} />
            </big>
          </div>
        ) : null}
      </CardBody>
      <CardFooter>
        {activeOrder.paid ? <QrCheckinLink /> : null}
        {activeOrder.confirmed && !activeOrder.paid ? (
          <OrderPaymentStatus
            cancelled={activeOrder.cancelled}
            paid={activeOrder.paid}
            overPaid={activeOrder.overPaid}
          />
        ) : null}
        {!activeOrder.paid && !activeOrder.confirmed && activeOrder.reservation ? (
          <Button
            className="pull-right"
            color="primary"
            onClick={onConfirm}
          >
            Potvrdit objednávku
          </Button>
        ) : null}
      </CardFooter>
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
