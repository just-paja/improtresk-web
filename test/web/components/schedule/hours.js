import React from 'react';

import { expect } from 'chai';
import { shallow } from 'enzyme';

import ScheduleHour from '../../../../src/web/components/schedule/hour';
import ScheduleHours from '../../../../src/web/components/schedule/hours';

describe('ScheduleHours component', () => {
  it('renders', () => {
    expect(shallow(
      <ScheduleHours
        max={13}
        min={9}
      />
    ).node).to.eql(
      <div className="hours-list">
        <ScheduleHour hour="9:00" />
        <ScheduleHour hour="10:00" />
        <ScheduleHour hour="11:00" />
        <ScheduleHour hour="12:00" />
        <ScheduleHour hour="13:00" />
      </div>
    );
  });
});
