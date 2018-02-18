import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Container from '../../components/Container';
import NotFound from '../NotFound';
import OrderStatus from '../../orders/components/OrderStatus';

class ParticipantHome extends Component {
  componentWillMount() {
    this.props.onMount();
  }

  render() {
    const {
      meals,
      onOrderCancel,
      onOrderConfirm,
      order,
      ready,
      year,
    } = this.props;

    if (!ready) {
      return null;
    }

    if (!order) {
      return <NotFound />;
    }

    return (
      <Container>
        <h1>Potvrzení objednávky</h1>
        <OrderStatus
          {...order}
          meals={meals}
          onCancel={onOrderCancel}
          onConfirm={onOrderConfirm}
          soft
          year={year}
        />
      </Container>
    );
  }
}

ParticipantHome.propTypes = {
  meals: PropTypes.arrayOf(PropTypes.object).isRequired,
  order: PropTypes.object,
  onOrderCancel: PropTypes.func.isRequired,
  onOrderConfirm: PropTypes.func.isRequired,
  onMount: PropTypes.func.isRequired,
  ready: PropTypes.bool,
  year: PropTypes.object,
};

ParticipantHome.defaultProps = {
  order: null,
  ready: false,
  year: false,
};

export default ParticipantHome;
