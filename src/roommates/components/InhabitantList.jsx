import classnames from 'classnames';
import CardBody from 'reactstrap/lib/CardBody';
import ListGroup from 'reactstrap/lib/ListGroup';
import ListGroupItem from 'reactstrap/lib/ListGroupItem';
import PropTypes from 'prop-types';
import React from 'react';

import { Inhabitant } from '../proptypes';

import Message from '../../containers/Message';

const InhabitantList = ({ inhabitants, participant }) => {
  if (inhabitants.length === 0) {
    return (
      <CardBody>
        <Message name="roommates.roomEmpty" />
      </CardBody>
    );
  }
  return (
    <ListGroup>
      {inhabitants.map(inhabitant => (
        <ListGroupItem
          className={classnames({ 'text-success': participant })}
          key={inhabitant.id}
        >
          {inhabitant.name}
        </ListGroupItem>
      ))}
    </ListGroup>
  );
};

InhabitantList.propTypes = {
  inhabitants: PropTypes.arrayOf(Inhabitant).isRequired,
  participant: PropTypes.number.isRequired,
};

export default InhabitantList;
