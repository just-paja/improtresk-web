import moment from 'moment-timezone';
import React from 'react';

import { shallow } from 'enzyme';

import ScheduleOverview from '../ScheduleOverview';

describe('ScheduleOverview component', () => {
  beforeEach(() => {
    moment.tz.setDefault('UTC');
  });

  it('renders all schedule days', () => {
    const comp = shallow(
      <ScheduleOverview
        year={{
          id: 616,
          endAt: '2017-02-05T00:00:00Z',
          startAt: '2017-02-03T00:00:00Z',
        }}
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
            endAt: '2017-02-04T11:00:00Z',
            workshops: [],
          },
        ]}
        rowHeight={2}
      />
    );

    const days = comp.find('ScheduleDay');
    expect(days.filter({ date: '2017-02-03T00:00:00Z' })).toHaveLength(1);
    expect(days.filter({ date: '2017-02-04T00:00:00Z' })).toHaveLength(1);
    expect(days.filter({ date: '2017-02-05T00:00:00Z' })).toHaveLength(1);
  });

  it('renders schedule hours background', () => {
    const comp = shallow(
      <ScheduleOverview
        year={{
          id: 616,
          endAt: '2017-02-05T00:00:00Z',
          startAt: '2017-02-03T00:00:00Z',
        }}
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
            endAt: '2017-02-04T11:00:00Z',
            workshops: [],
          },
        ]}
        rowHeight={2}
      />
    );

    expect(comp.find('ScheduleHours').at(0).props()).toMatchObject({
      min: 7,
      max: 12,
      rowHeight: 2,
    });
  });

  it('renders event contained in one day', () => {
    const event = {
      id: 1,
      name: 'Morning foo',
      startAt: '2017-02-03T08:00:00Z',
      endAt: '2017-02-03T10:00:00Z',
      workshops: [],
    };
    const comp = shallow(
      <ScheduleOverview
        year={{
          id: 616,
          endAt: '2017-02-05T00:00:00Z',
          startAt: '2017-02-03T00:00:00Z',
        }}
        events={[event]}
        rowHeight={2}
      />
    );

    expect(comp.find('ScheduleDay')
      .filterWhere(day => day.prop('events').find(dayEvent => dayEvent.id === 1)))
      .toHaveLength(1);
  });

  it('renders event stretched on two day', () => {
    const event = {
      id: 2,
      name: 'Morning foo',
      startAt: '2017-02-04T08:00:00Z',
      endAt: '2017-02-05T11:00:00Z',
      workshops: [],
    };
    const comp = shallow(
      <ScheduleOverview
        year={{
          id: 616,
          endAt: '2017-02-05T00:00:00Z',
          startAt: '2017-02-03T00:00:00Z',
        }}
        events={[event]}
        rowHeight={2}
      />
    );

    expect(comp.find('ScheduleDay')
      .filterWhere(day => day.prop('events').find(dayEvent => dayEvent.id === 2)))
      .toHaveLength(2);
  });
});
