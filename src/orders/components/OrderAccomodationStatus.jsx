import Alert from 'reactstrap/lib/Alert';
import FontAwesome from 'react-fontawesome';
import React from 'react';

import { Order, Participant } from '../../proptypes';
import { Room } from '../../roommates/proptypes';

import Message from '../../containers/Message';
import Link from '../../containers/Link';

const isIdentificationOk = (order, participant) => (
  !order.accomodation ||
  !order.accomodation.requiresIdentification ||
  (participant.idNumber && participant.address)
);

const isRoomChoiceOk = (order, roomChoice) => (
  !order.accomodation ||
  !order.accomodation.hasRooms ||
  roomChoice
);

const OrderAccomodation = ({
  order,
  participant,
  roomChoice,
}) => {
  if (!order) {
    return null;
  }
  const identOk = isIdentificationOk(order, participant);
  const roomOk = isRoomChoiceOk(order, roomChoice);
  return (
    <div>
      {identOk && roomOk ? (
        <Alert color="success">
          <FontAwesome name="check-circle" /> <Message name="orders.accomodationOk" />
        </Alert>
      ) : null}
      {!identOk ? (
        <Alert color="danger">
          <Message name="orders.needToFillInIdentification" />
          {' '}
          <Link to="participantIdentityEdit">
            <Message name="orders.fillIn" />
          </Link>
        </Alert>
      ) : null}
      {!roomOk ? (
        <Alert color="danger">
          <Message name="orders.needToChooseRoom" />
          {' '}
          <Link to="participantRoomSelection">
            <Message name="orders.choose" />
          </Link>
        </Alert>
      ) : null}
    </div>
  );
};

OrderAccomodation.propTypes = {
  order: Order,
  participant: Participant.isRequired,
  roomChoice: Room,
};

OrderAccomodation.defaultProps = {
  order: null,
  roomChoice: null,
};

export default OrderAccomodation;
