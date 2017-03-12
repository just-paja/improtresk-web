import React, { Component, PropTypes } from 'react';

import Container from '../../container';
import Order from '../../order';
import OrderStatus from '../../orderStatus';

class ParticipantHome extends Component {
  componentWillMount() {
    this.props.onMount();
  }

  render() {
    const {
      onWorkshopPickerChange,
      onWorkshopPickerSubmit,
      order,
      orderForm,
      participant,
      ready,
      workshops,
      yearNumber,
    } = this.props;

    if (!ready) {
      return null;
    }

    return (
      <Container>
        <h1>Můj Improtřesk {yearNumber}</h1>
        <strong>{participant.name}</strong>
        {order ?
          <OrderStatus {...order} /> :
          <Order
            form="order"
            onChange={onWorkshopPickerChange}
            onSubmit={onWorkshopPickerSubmit}
            workshops={workshops}
            {...orderForm}
          />
        }
      </Container>
    );
  }
}

ParticipantHome.propTypes = {
  order: PropTypes.object,
  participant: PropTypes.shape({
    name: PropTypes.string,
  }),
  onWorkshopPickerChange: PropTypes.func.isRequired,
  onWorkshopPickerSubmit: PropTypes.func.isRequired,
  onMount: PropTypes.func.isRequired,
  ready: PropTypes.bool,
  orderForm: PropTypes.object.isRequired,
  workshops: PropTypes.arrayOf(PropTypes.object).isRequired,
  yearNumber: PropTypes.string,
};

ParticipantHome.defaultProps = {
  order: null,
  participant: null,
  ready: false,
  yearNumber: null,
};

export default ParticipantHome;
