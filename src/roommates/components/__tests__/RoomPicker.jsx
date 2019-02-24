import React from 'react'

import { shallow } from 'enzyme'

import RoomPicker from '../RoomPicker'

describe('RoomPicker component', () => {
  it('renders rooms', () => {
    const comp = shallow(
      <RoomPicker
        onJoin={() => {}}
        onLeave={() => {}}
        participant={11}
        rooms={[
          {
            id: 20,
            number: '210',
            size: 3,
            inhabitants: []
          }
        ]}
      />
    )
    expect(comp.find('RoomPickerItem')).toHaveLength(1)
  })
})
