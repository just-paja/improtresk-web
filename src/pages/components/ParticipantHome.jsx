import Button from 'reactstrap/lib/Button';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Container from '../../components/Container';
import OrderForm from '../../orders/components/OrderForm';
import OrderStatus from '../../orders/components/OrderStatus';
import Prop from '../../components/Prop';

class ParticipantHome extends Component {
  componentWillMount() {
    this.props.onMount();
  }

  render() {
    const {
      accomodation,
      foodPickCloseDate,
      meals,
      mealsAvailable,
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
            foodPickCloseDate={foodPickCloseDate}
            meals={meals}
            onCancel={onOrderCancel}
            onConfirm={onOrderConfirm}
            showPaymentDetails
            showPaymentStatus
          /> :
          <OrderForm
            accomodation={accomodation}
            foodPickCloseDate={foodPickCloseDate}
            form="order"
            meals={mealsAvailable}
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
  foodPickCloseDate: PropTypes.string,
  meals: PropTypes.arrayOf(PropTypes.object).isRequired,
  mealsAvailable: PropTypes.arrayOf(PropTypes.object).isRequired,
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
  foodPickCloseDate: null,
  order: null,
  participant: null,
  price: null,
  ready: false,
  yearNumber: null,
};

export default ParticipantHome;
