import React from 'react';

import { expect } from 'chai';
import { shallow } from 'enzyme';

import ScheduleHour from '../../../../src/web/components/schedule/hour';

describe('ScheduleHour component', () => {
  it('renders', () => {
    expect(shallow(
      <ScheduleHour
        hour="8:00"
        rowHeight={64}
      />
    ).node).to.eql(
      <div style={{ minHeight: 64 }} className="hour-row">
        8:00
      </div>
    );
  });
});
