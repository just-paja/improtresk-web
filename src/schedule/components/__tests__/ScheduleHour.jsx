import React from 'react'

import { shallow } from 'enzyme'

import ScheduleHour from '../ScheduleHour'

describe('ScheduleHour component', () => {
  it('renders hour number', () => {
    const comp = shallow(
      <ScheduleHour
        hour='8:00'
        rowHeight={64}
      />
    )

    expect(comp.find({ children: '8:00' })).toHaveLength(1)
  })
})
