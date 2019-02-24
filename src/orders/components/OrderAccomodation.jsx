import Card from 'reactstrap/lib/Card'
import CardBody from 'reactstrap/lib/CardBody'
import CardFooter from 'reactstrap/lib/CardFooter'
import CardHeader from 'reactstrap/lib/CardHeader'
import React from 'react'

import { Order, Participant } from '../../proptypes'
import { Room } from '../../roommates/proptypes'

import OrderAccomodationDetails from './OrderAccomodationDetails'
import OrderAccomodationStatus from './OrderAccomodationStatus'
import Flex from '../../components/Flex'
import Message from '../../containers/Message'
import IconMessage from '../../components/IconMessage'
import Link from '../../containers/Link'

const OrderAccomodation = ({
  order,
  participant,
  roomChoice
}) => {
  if (!order) {
    return null
  }
  return (
    <Card className='mb-4'>
      <CardHeader>
        <Flex justify='between'>
          <IconMessage icon='bed' name='orders.accomodation' />
          {order.accomodation && order.accomodation.requiresIdentification ? (
            <Link to='participantIdentityEdit'>
              <Message name='participants.changeIdentification' />
            </Link>
          ) : null}
        </Flex>
      </CardHeader>
      <CardBody>
        {order.accomodation
          ? <OrderAccomodationDetails item={order.accomodation} />
          : <Message name='orders.noAccomodation' />
        }
      </CardBody>
      <CardFooter>
        <OrderAccomodationStatus
          order={order}
          participant={participant}
          roomChoice={roomChoice}
        />
      </CardFooter>
    </Card>
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
