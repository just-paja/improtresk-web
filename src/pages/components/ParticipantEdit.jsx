import Breadcrumb from 'reactstrap/lib/Breadcrumb';
import BreadcrumbItem from 'reactstrap/lib/BreadcrumbItem';
import React from 'react';
import Col from 'reactstrap/lib/Col';
import Row from 'reactstrap/lib/Row';

import Container from '../../components/Container';
import Link from '../../containers/Link';
import Message from '../../containers/Message';
import ParticipantEditForm from '../../participants/containers/ParticipantEditForm';

const ParticipantEdit = () => (
  <Container>
    <h1><Message name="participants.changePersonalInformation" /></h1>
    <Row>
      <Col md={{ offset: 3, size: 6 }}>
        <ParticipantEditForm />
      </Col>
    </Row>
    <Breadcrumb>
      <BreadcrumbItem>
        <Link to="participantHome">
          <Message name="participants.home" />
        </Link>
      </BreadcrumbItem>
      <BreadcrumbItem active>
        <Message name="participants.changePersonalInformation" />
      </BreadcrumbItem>
    </Breadcrumb>
  </Container>
);

ParticipantEdit.propTypes = {
};

export default ParticipantEdit;
