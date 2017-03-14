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
      meals,
      onLogout,
      onOrderMount,
      onOrderUnmount,
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
        <ul className="list-unstyled">
          <Prop label="Jméno">
            {participant.name}&nbsp;&nbsp;&nbsp;
            <Button bsSize="xsmall" onClick={onLogout} tabIndex={0}>Odhlásit</Button>
          </Prop>
          <Prop label="Tým">{participant.team}</Prop>
        </ul>
        <hr />
        {order ?
          <OrderStatus {...order} /> :
          <Order
            form="order"
            meals={meals}
            onMount={onOrderMount}
            onUnmount={onOrderUnmount}
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
  meals: PropTypes.arrayOf(PropTypes.object).isRequired,
  order: PropTypes.object,
  participant: PropTypes.shape({
    name: PropTypes.string,
  }),
  onLogout: PropTypes.func.isRequired,
  onOrderMount: PropTypes.func.isRequired,
  onOrderUnmount: PropTypes.func.isRequired,
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
