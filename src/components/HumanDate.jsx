import moment from 'moment';
import PropTypes from 'prop-types';
import React from 'react';

import * as dateTypes from '../constants/date';

const HumanDate = ({ date, showTime, showYear }) => {
  const formatDate = showYear ?
    dateTypes.FORMAT_HUMAN_DATE :
    dateTypes.FORMAT_HUMAN_DATE_NO_YEAR;

  const format = showTime ?
    `${formatDate} ${dateTypes.FORMAT_HUMAN_TIME}` : formatDate;

  if (!date) {
    return null;
  }

  return (<span>{moment(date).format(format)}</span>);
};

HumanDate.propTypes = {
  date: PropTypes.string,
  showTime: PropTypes.bool,
  showYear: PropTypes.bool,
};

HumanDate.defaultProps = {
  date: null,
  showTime: false,
  showYear: false,
};

export default HumanDate;
