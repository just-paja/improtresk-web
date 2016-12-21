import moment from 'moment';
import React, { PropTypes } from 'react';

import * as dateTypes from '../constants/date';

const HumanDate = ({ date, showTime }) => {
  const format = showTime ?
    `${dateTypes.FORMAT_HUMAN_DATE} ${dateTypes.FORMAT_HUMAN_TIME}` :
    dateTypes.FORMAT_HUMAN_DATE;

  return (<span>{moment(date).format(format)}</span>);
};

HumanDate.propTypes = {
  date: PropTypes.string.isRequired,
  showTime: PropTypes.bool,
};

HumanDate.defaultProps = {
  showTime: false,
};

export default HumanDate;
