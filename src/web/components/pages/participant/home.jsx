import React, { Component, PropTypes } from 'react';

import Container from '../../container';
import OrderStatus from '../../orderStatus';

class ParticipantHome extends Component {
  componentWillMount() {
    this.props.onMount();
  }

  render() {
    const { order, participant, ready, yearNumber } = this.props;

    if (!ready) {
      return null;
    }

    return (
      <Container>
        <h1>Můj Improtřesk {yearNumber}</h1>
        <strong>{participant.name}</strong>
        {order ? <OrderStatus {...order} /> : null}
      </Container>
    );
  }
}

ParticipantHome.propTypes = {
  order: PropTypes.object,
  participant: PropTypes.shape({
    name: PropTypes.string,
  }),
  onMount: PropTypes.func.isRequired,
  ready: PropTypes.bool,
  yearNumber: PropTypes.string,
};

ParticipantHome.defaultProps = {
  order: null,
  participant: null,
  ready: false,
  yearNumber: null,
};

export default ParticipantHome;
