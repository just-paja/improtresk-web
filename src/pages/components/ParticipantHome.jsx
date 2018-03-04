import Button from 'reactstrap/lib/Button';
import React from 'react';
import PropTypes from 'prop-types';

import Container from '../../components/Container';
import OrderList from '../../orders/containers/OrderList';
import Prop from '../../components/Prop';

const ParticipantHome = ({
  onLogout,
  participant,
  yearNumber,
}) => (
  <Container>
    <h1>Můj Improtřesk {yearNumber}</h1>
    <ul className="list-unstyled">
      <Prop label="Jméno">
        {participant.name}&nbsp;&nbsp;&nbsp;
        <Button size="xsmall" onClick={onLogout} tabIndex={0}>Odhlásit</Button>
      </Prop>
      <Prop label="Tým">{participant.team}</Prop>
    </ul>
    <OrderList />
  </Container>
);

ParticipantHome.propTypes = {
  onLogout: PropTypes.func.isRequired,
  participant: PropTypes.shape({ name: PropTypes.string }),
  yearNumber: PropTypes.string,
};

ParticipantHome.defaultProps = {
  participant: null,
  yearNumber: null,
};

export default ParticipantHome;
