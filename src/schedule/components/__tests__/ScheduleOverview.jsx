import moment from 'moment-timezone'
import React from 'react'

import { shallow } from 'enzyme'

import ScheduleOverview from '../ScheduleOverview'

describe('ScheduleOverview component', () => {
  beforeEach(() => {
    moment.tz.setDefault('UTC')
  })

  it('renders all schedule days', () => {
    const comp = shallow(
      <ScheduleOverview
        year={{
          id: 616,
          endDate: '2017-02-05T00:00:00Z',
          startDate: '2017-02-03T00:00:00Z'
        }}
        events={[
          {
            id: 1,
            name: 'Morning foo',
            startAt: '2017-02-03T08:00:00Z',
            endAt: '2017-02-03T10:00:00Z',
            workshops: []
          },
          {
            id: 2,
            name: 'Morning foo',
            startAt: '2017-02-04T08:00:00Z',
            endAt: '2017-02-04T11:00:00Z',
            workshops: []
          }
        ]}
        rowHeight={2}
      />
    )

    const days = comp.find('ScheduleDay')
    expect(days.filter({ date: '2017-02-03T00:00:00Z' })).toHaveLength(1)
    expect(days.filter({ date: '2017-02-04T00:00:00Z' })).toHaveLength(1)
    expect(days.filter({ date: '2017-02-05T00:00:00Z' })).toHaveLength(1)
  })

  it('renders schedule hours with max hour', () => {
    const comp = shallow(
      <ScheduleOverview
        year={{
          id: 616,
          endDate: '2017-02-05T00:00:00Z',
          startDate: '2017-02-03T00:00:00Z'
        }}
        events={[
          {
            id: 1,
            name: 'Morning foo',
            startAt: '2017-02-03T08:00:00Z',
            endAt: '2017-02-03T10:00:00Z',
            workshops: []
          },
          {
            id: 2,
            name: 'Morning foo',
            startAt: '2017-02-04T08:00:00Z',
            endAt: '2017-02-04T11:00:00Z',
            workshops: []
          }
        ]}
        rowHeight={2}
      />
    )
    expect(comp.find('ScheduleHours')).toHaveProp('max', 10)
  })

  it('renders schedule hours with rowHeight', () => {
    const comp = shallow(
      <ScheduleOverview
        year={{
          id: 616,
          endDate: '2017-02-05T00:00:00Z',
          startDate: '2017-02-03T00:00:00Z'
        }}
        events={[
          {
            id: 1,
            name: 'Morning foo',
            startAt: '2017-02-03T08:00:00Z',
            endAt: '2017-02-03T10:00:00Z',
            workshops: []
          },
          {
            id: 2,
            name: 'Morning foo',
            startAt: '2017-02-04T08:00:00Z',
            endAt: '2017-02-04T11:00:00Z',
            workshops: []
          }
        ]}
        rowHeight={2}
      />
    )
    expect(comp.find('ScheduleHours')).toHaveProp('rowHeight', 2)
  })

  it('renders schedule with min hour', () => {
    const comp = shallow(
      <ScheduleOverview
        year={{
          id: 616,
          endDate: '2017-02-05T00:00:00Z',
          startDate: '2017-02-03T00:00:00Z'
        }}
        events={[
          {
            id: 1,
            name: 'Morning foo',
            startAt: '2017-02-03T08:00:00Z',
            endAt: '2017-02-03T10:00:00Z',
            workshops: []
          },
          {
            id: 2,
            name: 'Morning foo',
            startAt: '2017-02-04T08:00:00Z',
            endAt: '2017-02-04T11:00:00Z',
            workshops: []
          }
        ]}
        rowHeight={2}
      />
    )
    expect(comp.find('ScheduleHours')).toHaveProp('min', 8)
  })

  it('renders schedule hours with one hour time skips', () => {
    const comp = shallow(
      <ScheduleOverview
        year={{
          id: 616,
          endDate: '2017-02-05T00:00:00Z',
          startDate: '2017-02-03T00:00:00Z'
        }}
        events={[
          {
            id: 1,
            name: 'Morning foo',
            startAt: '2017-02-03T08:00:00Z',
            endAt: '2017-02-03T09:00:00Z',
            workshops: []
          },
          {
            id: 2,
            name: 'Morning foo',
            startAt: '2017-02-04T11:00:00Z',
            endAt: '2017-02-04T12:00:00Z',
            workshops: []
          }
        ]}
        rowHeight={2}
      />
    )
    expect(comp.find('ScheduleHours')).toHaveProp('timeSkips', [10])
  })

  it('renders schedule hours with three hour time skips', () => {
    const comp = shallow(
      <ScheduleOverview
        year={{
          id: 616,
          endDate: '2017-02-05T00:00:00Z',
          startDate: '2017-02-03T00:00:00Z'
        }}
        events={[
          {
            id: 1,
            name: 'Morning foo',
            startAt: '2017-02-03T08:00:00Z',
            endAt: '2017-02-03T09:00:00Z',
            workshops: []
          },
          {
            id: 2,
            name: 'Morning foo',
            startAt: '2017-02-04T13:00:00Z',
            endAt: '2017-02-04T14:00:00Z',
            workshops: []
          }
        ]}
        rowHeight={2}
      />
    )
    expect(comp.find('ScheduleHours')).toHaveProp('timeSkips', [
      10, 11, 12
    ])
  })

  it('renders event contained in one day', () => {
    const event = {
      id: 1,
      name: 'Morning foo',
      startAt: '2017-02-03T08:00:00Z',
      endAt: '2017-02-03T10:00:00Z',
      workshops: []
    }
    const comp = shallow(
      <ScheduleOverview
        year={{
          id: 616,
          endDate: '2017-02-05T00:00:00Z',
          startDate: '2017-02-03T00:00:00Z'
        }}
        events={[event]}
        rowHeight={2}
      />
    )

    expect(comp.find('ScheduleDay')
      .filterWhere(day => day.prop('events').find(dayEvent => dayEvent.id === 1)))
      .toHaveLength(1)
  })
})
