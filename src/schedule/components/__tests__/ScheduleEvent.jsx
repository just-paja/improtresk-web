import React from 'react'

import { shallow } from 'enzyme'

import ScheduleEvent from '../ScheduleEvent'

describe('ScheduleEvent component', () => {
  it('renders time range', () => {
    const comp = shallow(
      <ScheduleEvent
        name='Morning foo'
        startAt='2016-02-03T08:00:00Z'
        endAt='2016-02-03T10:00:00Z'
        minHour={7}
        rowHeight={2}
        workshops={[]}
      />
    )
    expect(comp.find('HumanTimeRange')).toHaveLength(1)
  })

  it('renders performer front image', () => {
    const comp = shallow(
      <ScheduleEvent
        name='Morning foo'
        startAt='2016-02-03T08:00:00'
        endAt='2016-02-03T10:00:00'
        performer={{
          id: 213,
          name: 'Žáci po škole',
          slug: 'zaci-po-skole',
          frontImage: 'http://example.com/front-image'
        }}
        minHour={7}
        rowHeight={2}
        workshops={[]}
      />
    )

    expect(comp.find({
      style: {
        backgroundImage: 'url(http://example.com/front-image)'
      }
    })).toHaveLength(1)
  })

  it('renders with workshops class when given workshops', () => {
    const comp = shallow(
      <ScheduleEvent
        name='Morning foo'
        startAt='2016-02-03T08:00:00'
        endAt='2016-02-03T10:00:00'
        minHour={7}
        rowHeight={2}
        workshops={[
          {
            id: 214,
            name: 'Divadlo Fórum'
          },
          {
            id: 215,
            name: 'Rytmus a hlasy'
          }
        ]}
      />
    )
    expect(comp.find('.withWorkshops')).toHaveLength(1)
  })
})
