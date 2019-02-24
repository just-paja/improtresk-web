import Alert from 'reactstrap/lib/Alert'
import React from 'react'

import { Order, Participant } from '../../proptypes'
import { Room } from '../../roommates/proptypes'

import Message from '../../containers/Message'
import IconMessage from '../../components/IconMessage'
import Link from '../../containers/Link'

const isIdentificationOk = (order, participant) => (
  !order.accomodation ||
  !order.accomodation.requiresIdentification ||
  (participant.idNumber && participant.address)
)

const isRoomChoiceOk = (order, roomChoice) => (
  !order.accomodation ||
  !order.accomodation.hasRooms ||
  roomChoice
)

const OrderAccomodation = ({
  order,
  participant,
  roomChoice
}) => {
  if (!order) {
    return null
  }
  const identOk = isIdentificationOk(order, participant)
  const roomOk = isRoomChoiceOk(order, roomChoice)
  return (
    <div>
      {identOk && roomOk ? (
        <Alert color='success'>
          <IconMessage icon='check-circle' name='orders.accomodationOk' />
        </Alert>
      ) : null}
      {!identOk ? (
        <Alert color='danger'>
          <IconMessage icon='exclamation-triangle' name='orders.needToFillInIdentification' />
          {' '}
          <Link to='participantIdentityEdit'>
            <Message name='orders.fillIn' />
          </Link>
        </Alert>
      ) : null}
      {order.paid && !roomOk ? (
        <Alert color='danger'>
          <IconMessage icon='exclamation-triangle' name='orders.needToChooseRoom' />
          {' '}
          <Link to='participantRoomSelection'>
            <Message name='orders.choose' />
          </Link>
        </Alert>
      ) : null}
      {!order.paid && !roomOk ? (
        <Alert color='info'>
          <IconMessage icon='info-circle' name='orders.needToChooseRoom' />
          {' '}
          <Message name='orders.payToChooseRoom' />
        </Alert>
      ) : null}
    </div>
  )
}

OrderAccomodation.propTypes = {
  order: Order,
  participant: Participant.isRequired,
  roomChoice: Room
}

OrderAccomodation.defaultProps = {
  order: null,
  roomChoice: null
}

export default OrderAccomodation
