import React from 'react'

import { shallow } from 'enzyme'

import WorkshopDetail from '../WorkshopDetail'

describe('Workshop Detail component', () => {
  it('renders main heading', () => {
    const comp = shallow(
      <WorkshopDetail
        workshop={{
          capacityStatus: {},
          id: 12,
          desc: 'Na workshopu se zaměříme na práci s tělem, nonverbální.',
          difficulty: 'Pro všechny',
          name: 'Pantomima a fyzické divadlo',
          photos: [],
          prices: [
            {
              id: 2,
              name: 'Zlevněná',
              takesEffectOn: '2016-01-02',
              endsOn: '2016-01-05',
              price: 1200
            },
            {
              id: 5,
              name: 'Základní',
              takesEffectOn: '2016-01-05',
              price: 1900
            }
          ],
          lectors: [
            {
              id: 5,
              role: 'Hlavní lektor',
              lector: {
                id: 19,
                name: 'Vojtěch Svoboda',
                photos: [],
                about: 'Herectví se věnuje odmalička, kdy ztvárnil'
              }
            }
          ]
        }}
      />
    )
    expect(comp.find('h1')).toHaveText('Pantomima a fyzické divadlo')
  })

  it('does not render price list when no prices are available', () => {
    const comp = shallow(
      <WorkshopDetail
        workshop={{
          capacityStatus: {},
          id: 12,
          desc: 'Na workshopu se zaměříme na práci s tělem, nonverbální.',
          difficulty: 'Pro všechny',
          name: 'Pantomima a fyzické divadlo',
          photos: [],
          prices: [],
          lectors: []
        }}

      />
    )
    expect(comp.find('PriceList')).toHaveLength(0)
  })
})
