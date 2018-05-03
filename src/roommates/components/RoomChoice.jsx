import React from 'react';

import { Room } from '../proptypes';
import { grow } from './RoomChoice.css';

import Flex from '../../components/Flex';
import Link from '../../containers/Link';
import Message from '../../containers/Message';

const RoomChoice = ({ room }) => (room ?
  <Flex className={grow} inline justify="between">
    <span>{room.number}</span>
    <Link to="participantRoomSelection">
      <Message name="orders.changeRoom" />
    </Link>
  </Flex> :
  <span className="text-danger"><Message name="orders.notSelected" /></span>
);

RoomChoice.propTypes = {
  room: Room,
};

RoomChoice.defaultProps = {
  room: null,
};

export default RoomChoice;
