import moment from 'moment';
import React, { PropTypes } from 'react';

import * as dateTypes from '../constants/date';

const HumanTime = ({ date }) => {
  if (!date) {
    return null;
  }

  return (<span>{moment(date).format(dateTypes.FORMAT_HUMAN_TIME)}</span>);
};

HumanTime.propTypes = {
  date: PropTypes.string.isRequired,
};

export default HumanTime;
