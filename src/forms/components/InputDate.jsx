import moment from 'moment';
import React from 'react';

import Input from './Input';

export const formatValue = value => value;

const InputDate = props => (
  <Input
    {...props}
    changeLeadsToTouch
    dateFormat="YYYY-MM-DD"
    dayLabels={moment.weekdays()}
    formatValue={formatValue}
    monthLabels={moment.months()}
    showClearButton={false}
    weekStartsOnMonday={moment().startOf('week') === moment().startOf('isoWeek')}
    type="date"
  />
);

InputDate.defaultProps = {
  error: null,
  value: null,
};

export default InputDate;
