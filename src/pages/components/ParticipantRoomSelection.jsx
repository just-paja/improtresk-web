import Breadcrumb from 'reactstrap/lib/Breadcrumb';
import BreadcrumbItem from 'reactstrap/lib/BreadcrumbItem';
import React from 'react';

import Container from '../../components/Container';
import Link from '../../containers/Link';
import Message from '../../containers/Message';
import RoomSelection from '../../roommates/containers/RoomSelection';

const ParticipantRoomSelection = () => (
  <Container>
    <h1><Message name="roommates.selection" /></h1>
    <p>
      <Message name="roommates.selectionHelp" />
    </p>
    <RoomSelection />
    <Breadcrumb>
      <BreadcrumbItem>
        <Link to="participantHome">
          <Message name="participants.home" />
        </Link>
      </BreadcrumbItem>
      <BreadcrumbItem active>
        <Message name="orders.roomChange" />
      </BreadcrumbItem>
    </Breadcrumb>
  </Container>
);

ParticipantRoomSelection.propTypes = {
};

export default ParticipantRoomSelection;
