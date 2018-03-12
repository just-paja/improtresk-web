import React from 'react';
import PropTypes from 'prop-types';

import Container from '../../components/Container';
import OrderList from '../../orders/containers/OrderList';
import Prop from '../../components/Prop';
import RegistrationStatus from '../../orders/containers/RegistrationStatus';

const ParticipantHome = ({
  participant,
  yearNumber,
}) => (
  <Container>
    <h1>Můj Improtřesk {yearNumber}</h1>
    <ul className="list-unstyled">
      <Prop label="Jméno">{participant.name}</Prop>
      <Prop label="Tým">{participant.team}</Prop>
    </ul>
    <RegistrationStatus />
    <OrderList />
  </Container>
);

ParticipantHome.propTypes = {
  participant: PropTypes.shape({ name: PropTypes.string }),
  yearNumber: PropTypes.string,
};

ParticipantHome.defaultProps = {
  participant: null,
  yearNumber: null,
};

export default ParticipantHome;
