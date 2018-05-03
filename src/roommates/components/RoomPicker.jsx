import Alert from 'reactstrap/lib/Alert';
import Col from 'reactstrap/lib/Col';
import Row from 'reactstrap/lib/Row';
import React from 'react';
import PropTypes from 'prop-types';

import { Room } from '../proptypes';

import Link from '../../containers/Link';
import Message from '../../containers/Message';
import RoomPickerItem from './RoomPickerItem';

const RoomPicker = ({
  loading,
  onJoin,
  onLeave,
  participant,
  rooms,
  savedRoom,
  selectedRoom,
}) => (
  <div>
    <Row>
      {rooms.map(room => (
        <Col key={room.id} md={6} lg={4} xl={3}>
          <RoomPickerItem
            disabled={loading && selectedRoom !== room.id}
            loading={loading && selectedRoom === room.id}
            onJoin={onJoin}
            onLeave={onLeave}
            participant={participant}
            room={room}
          />
        </Col>
      ))}
    </Row>
    {savedRoom ? (
      <Alert className="mb-3">
        <Message name="roommates.selectionFinished" data={{ roomNumber: savedRoom.number }} />
        {' '}
        <Link to="participantHome">
          <Message name="participants.backHome" />
        </Link>
      </Alert>
  ) : null}
  </div>
);

RoomPicker.propTypes = {
  loading: PropTypes.bool,
  onJoin: PropTypes.func.isRequired,
  onLeave: PropTypes.func.isRequired,
  participant: PropTypes.number.isRequired,
  rooms: PropTypes.arrayOf(Room).isRequired,
  savedRoom: Room,
  selectedRoom: PropTypes.number,
};

RoomPicker.defaultProps = {
  loading: false,
  savedRoom: null,
  selectedRoom: null,
};

export default RoomPicker;
