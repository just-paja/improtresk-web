import React from 'react';

import { expect } from 'chai';
import { shallow } from 'enzyme';

import ScheduleDay from '../../../../src/web/components/schedule/day';
import ScheduleOverview from '../../../../src/web/components/schedule/overview';

describe('ScheduleOverview component', () => {
  it('renders', () => {
    expect(shallow(
      <ScheduleOverview
        endAt="2017-02-05T00:00:00Z"
        startAt="2017-02-03T00:00:00Z"
        events={[
          {
            id: 1,
            name: 'Morning foo',
            startAt: '2017-02-03T08:00:00Z',
            endAt: '2017-02-03T10:00:00Z',
            workshops: [],
          },
          {
            id: 2,
            name: 'Morning foo',
            startAt: '2017-02-04T08:00:00Z',
            endAt: '2017-02-04T10:00:00Z',
            workshops: [],
          },
        ]}
        rowHeight={2}
      />
    ).node).to.eql(
      <div>
        <ScheduleDay
          date="2017-02-03T00:00:00Z"
          rowHeight={2}
          events={[
            {
              id: 1,
              name: 'Morning foo',
              startAt: '2017-02-03T08:00:00Z',
              endAt: '2017-02-03T10:00:00Z',
              workshops: [],
            },
          ]}
        />
        <ScheduleDay
          date="2017-02-04T00:00:00Z"
          rowHeight={2}
          events={[
            {
              id: 2,
              name: 'Morning foo',
              startAt: '2017-02-04T08:00:00Z',
              endAt: '2017-02-04T10:00:00Z',
              workshops: [],
            },
          ]}
        />
        <ScheduleDay
          date="2017-02-05T00:00:00Z"
          rowHeight={2}
          events={[]}
        />
      </div>
    );
  });
});
