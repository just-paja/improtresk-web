import Breadcrumb from 'reactstrap/lib/Breadcrumb'
import BreadcrumbItem from 'reactstrap/lib/BreadcrumbItem'
import Col from 'reactstrap/lib/Col'
import React from 'react'
import Row from 'reactstrap/lib/Row'

import Container from '../../components/Container'
import Link from '../../containers/Link'
import Message from '../../containers/Message'
import ParticipantIdentityForm from '../../participants/containers/ParticipantIdentityForm'

const ParticipantIdentityEdit = () => (
  <Container>
    <h1><Message name='participants.identificationSettings' /></h1>
    <Row>
      <Col md={{ offset: 3, size: 6 }}>
        <p>
          <Message name='participants.identityFormHelp' />
        </p>
        <ParticipantIdentityForm />
      </Col>
    </Row>
    <Breadcrumb>
      <BreadcrumbItem>
        <Link to='participantHome'>
          <Message name='participants.home' />
        </Link>
      </BreadcrumbItem>
      <BreadcrumbItem active>
        <Message name='participants.identificationSettings' />
      </BreadcrumbItem>
    </Breadcrumb>
  </Container>
)

ParticipantIdentityEdit.propTypes = {
}

export default ParticipantIdentityEdit
