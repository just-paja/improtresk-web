import Card from 'reactstrap/lib/Card'
import CardHeader from 'reactstrap/lib/CardHeader'
import CardBody from 'reactstrap/lib/CardBody'
import React from 'react'

import { Participant } from '../../proptypes'

import Message from '../../containers/Message'
import IconMessage from '../../components/IconMessage'
import Prop from '../../components/Prop'
import Flex from '../../components/Flex'
import Link from '../../containers/Link'
import ImprovAge from '../../orders/containers/ImprovAge'

const ParticipantDetails = ({ participant }) => (
  <Card className='mb-4'>
    <CardHeader>
      <Flex justify='between'>
        <IconMessage icon='user' name='participants.details' />
        <Link to='participantEdit'>
          <Message name='participants.changeDetails' />
        </Link>
      </Flex>
    </CardHeader>
    <CardBody>
      <ul className='list-unstyled'>
        <Prop label={<Message name='participants.name' />}>{participant.name}</Prop>
        <Prop label={<Message name='participants.team' />}>{participant.team}</Prop>
        <Prop label={<Message name='participants.improvAge' />}><ImprovAge /></Prop>
      </ul>
    </CardBody>
  </Card>
)

ParticipantDetails.propTypes = {
  participant: Participant.isRequired
}

export default ParticipantDetails
