import Col from 'reactstrap/lib/Col';
import React from 'react';
import Row from 'reactstrap/lib/Row';

import Container from '../../components/Container';
import Message from '../../containers/Message';
import ParticipantIdentityForm from '../../participants/containers/ParticipantIdentityForm';

const ParticipantIdentityEdit = () => (
  <Container>
    <h1><Message name="participants.changeIdentification" /></h1>
    <Row>
      <Col md={{ offset: 3, size: 6 }}>
        <p>
          <Message name="participants.identityFormHelp" />
        </p>
        <ParticipantIdentityForm />
      </Col>
    </Row>
  </Container>
);

ParticipantIdentityEdit.propTypes = {
};

export default ParticipantIdentityEdit;
