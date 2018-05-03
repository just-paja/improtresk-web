import FontAwesome from 'react-fontawesome';
import React, { Component } from 'react';
import Card from 'reactstrap/lib/Card';
import CardHeader from 'reactstrap/lib/CardHeader';
import PropTypes from 'prop-types';

import { Room } from '../proptypes';

import Button from '../../components/Button';
import Flex from '../../components/Flex';
import FlexLabel from '../../components/FlexLabel';
import InhabitantList from './InhabitantList';
import Message from '../../containers/Message';

export default class RoomPickerItem extends Component {
  constructor() {
    super();
    this.handleJoin = this.handleJoin.bind(this);
    this.handleLeave = this.handleLeave.bind(this);
  }

  handleJoin() {
    this.props.onJoin(this.props.room.id);
  }

  handleLeave() {
    this.props.onLeave(this.props.room.id);
  }

  render() {
    const {
      disabled,
      loading,
      participant,
      room,
    } = this.props;
    let button = null;
    if (room.joined) {
      button = (
        <Button
          loading={loading}
          disabled={disabled}
          link
          size="sm"
          icon="sign-out"
          onClick={this.handleLeave}
        >
          <Message name="roommates.leave" />
        </Button>
      );
    } else if (room.inhabitants.length < room.size) {
      button = (
        <Button
          loading={loading}
          disabled={disabled}
          link
          size="sm"
          icon="sign-in"
          onClick={this.handleJoin}
        >
          <Message name="roommates.join" />
        </Button>
      );
    }
    return (
      <Card className="mb-3">
        <CardHeader>
          <Flex justify="between">
            <FlexLabel>
              <strong>
                <FontAwesome name="key" />
                {' '}
                <Message name="roommates.room" />
                {' '}
                {room.number}
              </strong>
              <span>{room.inhabitants.length}/{room.size}</span>
            </FlexLabel>
            {button}
          </Flex>
        </CardHeader>
        <InhabitantList
          inhabitants={room.inhabitants}
          participant={participant}
        />
      </Card>
    );
  }
}

RoomPickerItem.propTypes = {
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
  onJoin: PropTypes.func.isRequired,
  onLeave: PropTypes.func.isRequired,
  participant: PropTypes.number.isRequired,
  room: Room.isRequired,
};

RoomPickerItem.defaultProps = {
  disabled: false,
  loading: false,
};
