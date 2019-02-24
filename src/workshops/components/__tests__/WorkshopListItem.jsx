import React from 'react'

import { shallow } from 'enzyme'

import WorkshopListItem from '../WorkshopListItem'

describe('WorkshopListItem component', () => {
  it('renders workshop name', () => {
    const comp = shallow(
      <WorkshopListItem
        workshop={{
          id: 12,
          desc: 'Na workshopu se zaměříme na práci s tělem, nonverbální herectví a pantomimu.',
          difficulty: 'Pro všechny',
          name: 'Pantomima a fyzické divadlo',
          capacityStatus: {},
          lectors: [
            {
              id: 10,
              role: 'Hlavní lektor',
              lector: {
                id: 11,
                name: 'Vojtěch Svoboda'
              }
            }
          ]
        }}
      />
    )
    expect(comp.find({ children: 'Pantomima a fyzické divadlo' })).toHaveLength(1)
  })

  it('renders workshop difficulty', () => {
    const comp = shallow(
      <WorkshopListItem
        workshop={{
          id: 12,
          desc: 'Na workshopu se zaměříme na práci s tělem, nonverbální herectví a pantomimu.',
          difficulty: 'Pro všechny',
          name: 'Pantomima a fyzické divadlo',
          capacityStatus: {
            freeSpots: 10,
            reserved: 4
          },
          lectors: [
            {
              id: 10,
              role: 'Hlavní lektor',
              lector: {
                id: 11,
                name: 'Vojtěch Svoboda'
              }
            }
          ]
        }}
      />
    )
    expect(comp.find({ children: 'Pro všechny' })).toHaveLength(1)
  })

  it('renders workshop capacity item', () => {
    const comp = shallow(
      <WorkshopListItem
        workshop={{
          id: 12,
          desc: 'Na workshopu se zaměříme na práci s tělem, nonverbální herectví a pantomimu.',
          difficulty: 'Pro všechny',
          name: 'Pantomima a fyzické divadlo',
          capacityStatus: {
            freeSpots: 10,
            reserved: 4
          },
          lectors: [
            {
              id: 10,
              role: 'Hlavní lektor',
              lector: {
                id: 11,
                name: 'Vojtěch Svoboda'
              }
            }
          ]
        }}
      />
    )
    expect(comp.find('Capacity').props()).toMatchObject({
      freeSpots: 10,
      reserved: 4
    })
  })
})
