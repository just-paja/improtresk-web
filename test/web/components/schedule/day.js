import moment from 'moment';
import React from 'react';

import { expect } from 'chai';
import { shallow } from 'enzyme';

import ScheduleDay from '../../../../src/web/components/schedule/day';
import ScheduleEvent from '../../../../src/web/components/schedule/event';

describe('ScheduleDay component', () => {
  it('renders', () => {
    moment.locale('en');
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
        minHour={7}
        rowHeight={2}
      />
    ).node).to.eql(
      <div>
        <div className="day-header">Friday</div>
        <div>
          <ScheduleEvent
            endAt="2016-02-03T10:00:00"
            minHour={7}
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
