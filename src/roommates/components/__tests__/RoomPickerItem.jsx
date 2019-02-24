import React from 'react'

import { shallow } from 'enzyme'

import RoomPickerItem from '../RoomPickerItem'

describe('RoomPickerItem component', () => {
  it('renders select button', () => {
    const comp = shallow(
      <RoomPickerItem
        onJoin={() => {}}
        onLeave={() => {}}
        participant={11}
        room={{
          id: 20,
          number: '210',
          size: 3,
          inhabitants: []
        }}
      />
    )
    expect(comp.find('Button')).toHaveLength(1)
  })
})
