import PropTypes from 'prop-types'
import React from 'react'
import UncontrolledTooltip from 'reactstrap/lib/UncontrolledTooltip'

import Countdown from '../../components/Countdown'
import Message from '../../containers/Message'

class OrderTimeout extends React.Component {
  constructor (props) {
    super(props)
    this.spanRef = React.createRef()
  }

  render () {
    const { endsAt } = this.props
    return (
      <span ref={this.spanRef} id='reservation-trigger-tooltip'>
        <UncontrolledTooltip placement='bottom' target={this.spanRef}>
          <Message name='orders.orderExpiresHelp' />
        </UncontrolledTooltip>
        <Countdown countdownMessage='orders.expiresIn' readyMessage='orders.timedOut' date={endsAt} />
      </span>
    )
  }
}

OrderTimeout.propTypes = {
  endsAt: PropTypes.string.isRequired
}

export default OrderTimeout
