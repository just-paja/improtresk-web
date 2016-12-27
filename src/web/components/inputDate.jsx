import DatePicker from 'react-bootstrap-date-picker';
import moment from 'moment';
import React from 'react';

import 'react-select/dist/react-select.css';

import Input from './input';

const formatValue = value => moment(value).format('YYYY-MM-DD');

const InputDate = props => (
  <Input
    {...props}
    Control={DatePicker}
    changeLeadsToTouch
    dateFormat="YYYY-MM-DD"
    dayLabels={[
      'Ne',
      'Po',
      'Út',
      'St',
      'Čt',
      'Pá',
      'So',
    ]}
    formatValue={formatValue}
    monthLabels={[
      'Leden',
      'Únor',
      'Březen',
      'Duben',
      'Květen',
      'Červen',
      'Červenec',
      'Srpen',
      'Září',
      'Říjen',
      'Listopad',
      'Prosinec',
    ]}
    showClearButton={false}
    weekStartsOnMonday
  />
);

export default InputDate;
