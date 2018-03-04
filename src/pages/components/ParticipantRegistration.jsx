import React from 'react';
// import PropTypes from 'prop-types';

import Container from '../../components/Container';
import OrderForm from '../../orders/containers/OrderForm';
import Message from '../../containers/Message';

const ParticipantHome = () => (
  <Container>
    <h1><Message name="orders.register" /></h1>
    <OrderForm />
  </Container>
);

ParticipantHome.propTypes = {
};

ParticipantHome.defaultProps = {
};

export default ParticipantHome;
