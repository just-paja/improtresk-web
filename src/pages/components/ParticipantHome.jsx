import Col from 'reactstrap/lib/Col';
import React from 'react';
import Row from 'reactstrap/lib/Row';
import PropTypes from 'prop-types';

import Container from '../../components/Container';
import OrderAccomodation from '../../orders/containers/OrderAccomodation';
import OrderFood from '../../orders/containers/OrderFood';
import OrderList from '../../orders/containers/OrderList';
import ParticipantDetails from '../../participants/components/ParticipantDetails';
import RegistrationStatus from '../../orders/containers/RegistrationStatus';

const ParticipantHome = ({
  participant,
  yearNumber,
}) => (
  <Container>
    <h1>Můj Improtřesk {yearNumber}</h1>
    <Row>
      <Col md={6}><RegistrationStatus /></Col>
      <Col md={6}><ParticipantDetails participant={participant} /></Col>
      <Col md={6}><OrderFood /></Col>
      <Col md={6}><OrderAccomodation /></Col>
    </Row>
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
