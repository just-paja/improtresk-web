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

  renderButton(message, icon, onClick) {
    return (
      <Button
        loading={this.props.loading}
        disabled={this.props.disabled}
        link
        size="sm"
        icon={icon}
        onClick={onClick}
      >
        <Message name={message} />
      </Button>
    );
  }

  renderActionButton() {
    let button = null;
    if (this.props.room.joined) {
      button = this.renderButton('roommates.leave', 'sign-out', this.handleLeave);
    } else if (this.props.room.inhabitants.length < this.props.room.size) {
      button = this.renderButton('roommates.join', 'sign-in', this.handleJoin);
    }
    return button;
  }

  render() {
    const { participant, room } = this.props;
    return (
      <Card className="mb-3">
        <CardHeader>
          <Flex justify="between">
            <FlexLabel>
              <strong>
                <FontAwesome name="key" />{' '}
                <Message name="roommates.room" />{' '}
                {room.number}
              </strong>
              <span>{room.inhabitants.length}/{room.size}</span>
            </FlexLabel>
            {this.renderActionButton()}
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
