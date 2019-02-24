import moment from 'moment'
import PropTypes from 'prop-types'
import React from 'react'

import * as dateTypes from '../constants/date'

const getFormat = ({ showTime }) => {
  const formatDate = dateTypes.FORMAT_HUMAN_DATE
  return showTime
    ? `${formatDate} ${dateTypes.FORMAT_HUMAN_TIME}` : formatDate
}

export const formatDate = (date, options) => moment(date).format(getFormat(options))

const HumanDate = ({ date, ...options }) => {
  if (!date) {
    return null
  }

  return (<span>{moment(date).format(getFormat(options))}</span>)
}

HumanDate.propTypes = {
  date: PropTypes.string,
  showTime: PropTypes.bool
}

HumanDate.defaultProps = {
  date: null,
  showTime: false
}

export default HumanDate
