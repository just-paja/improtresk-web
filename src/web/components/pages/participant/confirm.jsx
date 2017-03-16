import React, { Component, PropTypes } from 'react';

import Container from '../../container';
import NotFound from '../../notFound';
import OrderStatus from '../../orderStatus';

class ParticipantHome extends Component {
  componentWillMount() {
    this.props.onMount();
  }

  render() {
    const {
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
  order: PropTypes.object,
  onOrderCancel: PropTypes.func.isRequired,
  onOrderConfirm: PropTypes.func.isRequired,
  onMount: PropTypes.func.isRequired,
  ready: PropTypes.bool,
  year: PropTypes.object,
};

ParticipantHome.defaultProps = {
  price: null,
  order: null,
  participant: null,
  ready: false,
  year: false,
};

export default ParticipantHome;