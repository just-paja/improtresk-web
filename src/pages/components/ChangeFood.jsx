import React from 'react';

import Container from '../../components/Container';
import Message from '../../containers/Message';
import FoodForm from '../../orders/containers/FoodForm';

const ChangeFoodPage = () => (
  <Container>
    <h1><Message name="orders.changeFood" /></h1>
    <FoodForm />
  </Container>
);

export default ChangeFoodPage;
