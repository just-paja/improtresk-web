import Button from 'react-bootstrap/lib/Button';
import React, { Component, PropTypes } from 'react';

import Container from '../../container';
import Order from '../../order';
import OrderStatus from '../../orderStatus';
import Prop from '../../prop';

class ParticipantHome extends Component {
  componentWillMount() {
    this.props.onMount();
  }

  render() {
    const {
      accomodation,
      meals,
      onLogout,
      onOrderCancel,
      onOrderConfirm,
      onOrderMount,
      onOrderUnmount,
      onWorkshopPickerChange,
      onWorkshopPickerSubmit,
      order,
      orderForm,
      participant,
      price,
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
        <ul className="list-unstyled">
          <Prop label="Jméno">
            {participant.name}&nbsp;&nbsp;&nbsp;
            <Button bsSize="xsmall" onClick={onLogout} tabIndex={0}>Odhlásit</Button>
          </Prop>
          <Prop label="Tým">{participant.team}</Prop>
        </ul>
        <hr />
        {order ?
          <OrderStatus
            {...order}
            assigned={!!participant.assigned_workshop}
            onCancel={onOrderCancel}
            onConfirm={onOrderConfirm}
            showPaymentDetails
            showPaymentStatus
          /> :
          <Order
            accomodation={accomodation}
            form="order"
            meals={meals}
            onMount={onOrderMount}
            onUnmount={onOrderUnmount}
            onChange={onWorkshopPickerChange}
            onSubmit={onWorkshopPickerSubmit}
            price={price}
            workshops={workshops}
            {...orderForm}
          />
        }
      </Container>
    );
  }
}

ParticipantHome.propTypes = {
  accomodation: PropTypes.arrayOf(PropTypes.object).isRequired,
  meals: PropTypes.arrayOf(PropTypes.object).isRequired,
  onLogout: PropTypes.func.isRequired,
  onMount: PropTypes.func.isRequired,
  onOrderCancel: PropTypes.func.isRequired,
  onOrderConfirm: PropTypes.func.isRequired,
  onOrderMount: PropTypes.func.isRequired,
  onOrderUnmount: PropTypes.func.isRequired,
  onWorkshopPickerChange: PropTypes.func.isRequired,
  onWorkshopPickerSubmit: PropTypes.func.isRequired,
  order: PropTypes.object,
  orderForm: PropTypes.object.isRequired,
  participant: PropTypes.shape({ name: PropTypes.string }),
  price: PropTypes.number,
  ready: PropTypes.bool,
  workshops: PropTypes.arrayOf(PropTypes.object).isRequired,
  yearNumber: PropTypes.string,
};

ParticipantHome.defaultProps = {
  price: null,
  order: null,
  participant: null,
  ready: false,
  yearNumber: null,
};

export default ParticipantHome;
