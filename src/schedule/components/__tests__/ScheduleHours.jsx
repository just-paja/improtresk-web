import React from 'react'

import { shallow } from 'enzyme'

import ScheduleHours from '../ScheduleHours'

describe('ScheduleHours component', () => {
  it('renders all passed hours', () => {
    const comp = shallow(
      <ScheduleHours
        max={13}
        min={9}
        rowHeight={2}
      />
    )

    const hours = comp.find('ScheduleHour')
    expect(hours.filter({ hour: '9:00' })).toHaveLength(1)
    expect(hours.filter({ hour: '10:00' })).toHaveLength(1)
    expect(hours.filter({ hour: '11:00' })).toHaveLength(1)
    expect(hours.filter({ hour: '12:00' })).toHaveLength(1)
    expect(hours.filter({ hour: '13:00' })).toHaveLength(1)
  })
})
