import Alert from 'reactstrap/lib/Alert';
import Card from 'reactstrap/lib/Card';
import CardBody from 'reactstrap/lib/CardBody';
import CardFooter from 'reactstrap/lib/CardFooter';
import CardHeader from 'reactstrap/lib/CardHeader';
import FontAwesome from 'react-fontawesome';
import React from 'react';

import { Order, Participant } from '../../proptypes';

import OrderAccomodationDetails from './OrderAccomodationDetails';
import Flex from '../../components/Flex';
import Message from '../../containers/Message';
import Link from '../../containers/Link';

const isOk = (order, participant) => (
  !order.accomodation ||
  !order.accomodation.requiresIdentification ||
  (participant.idNumber && participant.address)
);

const OrderAccomodation = ({
  order,
  participant,
}) => {
  if (!order) {
    return null;
  }
  return (
    <Card className="mb-4">
      <CardHeader>
        <Flex justify="between">
          <span>
            <FontAwesome name="bed" />
            {' '}
            <Message name="orders.accomodation" />
          </span>
          {order.accomodation && order.accomodation.requiresIdentification ? (
            <Link to="participantIdentityEdit">
              <Message name="participants.changeIdentification" />
            </Link>
          ) : null}
        </Flex>
      </CardHeader>
      <CardBody>
        <p>
          {order.accomodation ?
            <OrderAccomodationDetails item={order.accomodation} /> :
            <Message name="orders.noAccomodation" />
          }
        </p>
      </CardBody>
      <CardFooter>
        {isOk(order, participant) ? (
          <Alert color="info">
            <FontAwesome name="check-circle" /> <Message name="orders.accomodationOk" />
          </Alert>
        ) : (
          <Alert color="danger">
            <Message name="orders.needToFillInIdentification" />
            {' '}
            <Link to="participantIdentityEdit">
              <Message name="orders.fillIn" />
            </Link>
          </Alert>
        )}
      </CardFooter>
    </Card>
  );
};

OrderAccomodation.propTypes = {
  order: Order,
  participant: Participant.isRequired,
};

OrderAccomodation.defaultProps = {
  order: null,
};

export default OrderAccomodation;
