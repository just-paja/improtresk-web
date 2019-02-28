import Label from 'reactstrap/lib/Label'
import moment from 'moment-timezone'
import PropTypes from 'prop-types'
import React from 'react'

import { Reservation, Workshop } from '../../proptypes'

import Message from '../../containers/Message'

const OrderStatusLabel = ({
  assigned,
  cancelled,
  confirmed,
  endsAt,
  paid,
  reservation,
  workshop
}) => {
  if (cancelled) {
    return <Label className='mb-0 text-danger'><Message name='orders.cancelled' /></Label>
  }

  if (!reservation) {
    return <Label className='mb-0 text-danger'><Message name='orders.missingReservation' /></Label>
  }

  if (assigned) {
    return <Label className='mb-0 text-success'><Message name='orders.assigned' /></Label>
  }

  if (paid) {
    if (workshop) {
      return <Label className='mb-0 text-info'><Message name='orders.waitingToBeAssigned' /></Label>
    }
    return <Label className='mb-0 text-success'><Message name='orders.paid' /></Label>
  }

  if (moment().isAfter(endsAt)) {
    return <Label className='mb-0 text-warning'><Message name='orders.timedOut' /></Label>
  }

  if (confirmed) {
    return <Label className='mb-0 text-warning'><Message name='orders.waitingToBePaid' /></Label>
  }

  return <Label className='mb-0 text-danger'><Message name='orders.unconfirmed' /></Label>
}

OrderStatusLabel.propTypes = {
  assigned: PropTypes.bool,
  cancelled: PropTypes.bool,
  confirmed: PropTypes.bool,
  endsAt: PropTypes.string.isRequired,
  paid: PropTypes.bool,
  reservation: Reservation,
  workshop: Workshop
}

OrderStatusLabel.defaultProps = {
  assigned: false,
  cancelled: false,
  confirmed: false,
  paid: false,
  reservation: null,
  workshop: null
}

export default OrderStatusLabel
