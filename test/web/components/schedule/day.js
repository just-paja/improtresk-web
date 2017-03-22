import React from 'react';

import { expect } from 'chai';
import { shallow } from 'enzyme';

import ScheduleDay from '../../../../src/web/components/schedule/day';
import ScheduleEvent from '../../../../src/web/components/schedule/event';

describe('ScheduleDay component', () => {
  it('renders', () => {
    expect(shallow(
      <ScheduleDay
        date="2017-02-03"
        events={[
          {
            id: 1,
            name: 'Morning foo',
            startAt: '2016-02-03T08:00:00',
            endAt: '2016-02-03T10:00:00',
            workshops: [],
          },
        ]}
        maxHour={11}
        minHour={7}
        rowHeight={2}
      />
    ).node).to.eql(
      <div>
        <div>Friday</div>
        <div>
          <ScheduleEvent
            endAt="2016-02-03T10:00:00"
            name="Morning foo"
            rowHeight={2}
            startAt="2016-02-03T08:00:00"
            workshops={[]}
          />
        </div>
      </div>
    );
  });
});
