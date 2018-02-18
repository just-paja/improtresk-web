import moment from 'moment';
import PropTypes from 'prop-types';
import React from 'react';

import * as dateTypes from '../constants/date';

const HumanTime = ({ date }) => {
  if (!date) {
    return null;
  }

  return (<span>{moment(date).format(dateTypes.FORMAT_HUMAN_TIME)}</span>);
};

HumanTime.propTypes = {
  date: PropTypes.string,
};

HumanTime.defaultProps = {
  date: null,
};

export default HumanTime;
