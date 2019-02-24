import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Order } from '../../proptypes'

import Container from '../../components/Container'
import OrderForm from '../../orders/containers/OrderForm'
import Message from '../../containers/Message'

export default class ParticipantRegistration extends Component {
  componentWillMount () {
    if (this.props.order) {
      this.props.onExistingOrder()
    }
  }

  componentDidUpdate () {
    if (this.props.order) {
      this.props.onExistingOrder()
    }
  }

  render () {
    return (
      <Container>
        <h1><Message name='orders.register' /></h1>
        <OrderForm />
      </Container>
    )
  }
}

ParticipantRegistration.propTypes = {
  order: Order,
  onExistingOrder: PropTypes.func.isRequired
}

ParticipantRegistration.defaultProps = {
  order: null
}
