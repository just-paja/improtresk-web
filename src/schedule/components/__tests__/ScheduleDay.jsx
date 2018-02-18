import moment from 'moment';
import React from 'react';

import { shallow } from 'enzyme';

import ScheduleDay from '../ScheduleDay';

describe('ScheduleDay component', () => {
  beforeEach(() => {
    moment.locale('en_US');
  });

  it('renders day name', () => {
    const comp = shallow(
      <ScheduleDay
        date="2017-02-03"
        events={[
          {
            id: 1,
            name: 'Morning foo',
            startAt: '2016-02-03T08:00:00Z',
            endAt: '2016-02-03T10:00:00Z',
            workshops: [],
          },
        ]}
        minHour={7}
        rowHeight={2}
      />
    );
    expect(comp.find({ children: 'Friday' })).toHaveLength(1);
  });

  it('renders two evenly crossed events', () => {
    const comp = shallow(
      <ScheduleDay
        date="2017-02-03"
        events={[
          {
            id: 1,
            name: 'Morning foo',
            startAt: '2016-02-03T08:00:00Z',
            endAt: '2016-02-03T10:00:00Z',
            workshops: [],
          },
          {
            id: 2,
            name: 'Morning foo',
            startAt: '2016-02-03T08:00:00Z',
            endAt: '2016-02-03T10:00:00Z',
            workshops: [],
          },
        ]}
        minHour={7}
        rowHeight={2}
      />
    );
    expect(comp.find('ScheduleEvent').at(0)).toHaveProp('crossing', 1);
    expect(comp.find('ScheduleEvent').at(0)).toHaveProp('rowHeight', 2);
    expect(comp.find('ScheduleEvent').at(0)).toHaveProp('minHour', 7);
    expect(comp.find('ScheduleEvent').at(1)).toHaveProp('crossing', 1);
    expect(comp.find('ScheduleEvent').at(1)).toHaveProp('crossingPosition', 1);
    expect(comp.find('ScheduleEvent').at(1)).toHaveProp('rowHeight', 2);
    expect(comp.find('ScheduleEvent').at(1)).toHaveProp('minHour', 7);
  });

  it('renders two unevenly crossed events', () => {
    const comp = shallow(
      <ScheduleDay
        date="2017-02-03"
        events={[
          {
            id: 1,
            name: 'Morning foo',
            startAt: '2016-02-03T08:00:00Z',
            endAt: '2016-02-03T10:00:00Z',
            workshops: [],
          },
          {
            id: 2,
            name: 'Morning foo',
            startAt: '2016-02-03T09:00:00Z',
            endAt: '2016-02-03T11:00:00Z',
            workshops: [],
          },
        ]}
        minHour={7}
        rowHeight={2}
      />
    );

    expect(comp.find('ScheduleEvent').at(0)).toHaveProp('crossing', 1);
    expect(comp.find('ScheduleEvent').at(0)).toHaveProp('minHour', 7);
    expect(comp.find('ScheduleEvent').at(0)).toHaveProp('rowHeight', 2);
    expect(comp.find('ScheduleEvent').at(1)).toHaveProp('crossing', 1);
    expect(comp.find('ScheduleEvent').at(1)).toHaveProp('crossingPosition', 1);
    expect(comp.find('ScheduleEvent').at(1)).toHaveProp('minHour', 7);
    expect(comp.find('ScheduleEvent').at(1)).toHaveProp('rowHeight', 2);
  });

  it('renders two crossed events with same start', () => {
    const comp = shallow(
      <ScheduleDay
        date="2017-02-03"
        events={[
          {
            id: 1,
            name: 'Morning foo',
            startAt: '2016-02-03T08:00:00Z',
            endAt: '2016-02-03T10:00:00Z',
            workshops: [],
          },
          {
            id: 2,
            name: 'Morning foo',
            startAt: '2016-02-03T08:00:00Z',
            endAt: '2016-02-03T11:00:00Z',
            workshops: [],
          },
        ]}
        minHour={7}
        rowHeight={2}
      />
    );

    expect(comp.find('ScheduleEvent').at(0)).toHaveProp('crossing', 1);
    expect(comp.find('ScheduleEvent').at(0)).toHaveProp('rowHeight', 2);
    expect(comp.find('ScheduleEvent').at(0)).toHaveProp('minHour', 7);
    expect(comp.find('ScheduleEvent').at(1)).toHaveProp('crossing', 1);
    expect(comp.find('ScheduleEvent').at(1)).toHaveProp('crossingPosition', 1);
    expect(comp.find('ScheduleEvent').at(1)).toHaveProp('rowHeight', 2);
    expect(comp.find('ScheduleEvent').at(1)).toHaveProp('minHour', 7);
  });

  it('renders two crossed events with same end', () => {
    const comp = shallow(
      <ScheduleDay
        date="2017-02-03"
        events={[
          {
            id: 1,
            name: 'Morning foo',
            startAt: '2016-02-03T08:00:00Z',
            endAt: '2016-02-03T10:00:00Z',
            workshops: [],
          },
          {
            id: 2,
            name: 'Morning foo',
            startAt: '2016-02-03T09:00:00Z',
            endAt: '2016-02-03T10:00:00Z',
            workshops: [],
          },
        ]}
        minHour={7}
        rowHeight={2}
      />
    );
    expect(comp.find('ScheduleEvent').at(0)).toHaveProp('crossing', 1);
    expect(comp.find('ScheduleEvent').at(0)).toHaveProp('rowHeight', 2);
    expect(comp.find('ScheduleEvent').at(0)).toHaveProp('minHour', 7);
    expect(comp.find('ScheduleEvent').at(1)).toHaveProp('crossing', 1);
    expect(comp.find('ScheduleEvent').at(1)).toHaveProp('crossingPosition', 1);
    expect(comp.find('ScheduleEvent').at(1)).toHaveProp('rowHeight', 2);
    expect(comp.find('ScheduleEvent').at(1)).toHaveProp('minHour', 7);
  });
});
