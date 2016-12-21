import moment from 'moment';
import React, { PropTypes } from 'react';

import * as dateTypes from '../constants/date';

const HumanDate = ({ date, showTime, showYear }) => {
  const formatDate = showYear ?
    dateTypes.FORMAT_HUMAN_DATE :
    dateTypes.FORMAT_HUMAN_DATE_NO_YEAR;

  const format = showTime ?
    `${formatDate} ${dateTypes.FORMAT_HUMAN_TIME}` : formatDate;

  return (<span>{moment(date).format(format)}</span>);
};

HumanDate.propTypes = {
  date: PropTypes.string.isRequired,
  showTime: PropTypes.bool,
  showYear: PropTypes.bool,
};

HumanDate.defaultProps = {
  showTime: false,
  showYear: false,
};

export default HumanDate;
