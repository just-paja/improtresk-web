import DatePicker from 'react-bootstrap-date-picker';
import React from 'react';

import { expect } from 'chai';
import { shallow } from 'enzyme';

import Input from '../../../../src/web/components/inputs/input';
import InputDate, { formatValue } from '../../../../src/web/components/inputs/inputDate';

describe('Input Date component', () => {
  it('transforms date into proper format', () => {
    expect(formatValue('2016-01-02T03:04:05.678')).to.equal('2016-01-02');
  });
  it('renders input component', () => {
    expect(shallow(
      <InputDate
        label="Input label"
        name="text-input"
      />
    ).node).to.eql(
      <Input
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
        label="Input label"
        name="text-input"
        showClearButton={false}
        weekStartsOnMonday
      />
    );
  });
});
