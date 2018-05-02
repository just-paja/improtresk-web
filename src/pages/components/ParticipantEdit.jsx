import React from 'react';

import Container from '../../components/Container';
import Message from '../../containers/Message';
import ParticipantEditForm from '../../participants/containers/ParticipantEditForm';

const ParticipantEdit = () => (
  <Container>
    <h1><Message name="participants.changePersonalInformation" /></h1>
    <ParticipantEditForm />
  </Container>
);

ParticipantEdit.propTypes = {
};

export default ParticipantEdit;
