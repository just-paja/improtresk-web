import React from 'react'

import { shallow } from 'enzyme'

import WorkshopSummary from '../WorkshopSummary'

describe('Workshop Summary component', () => {
  it('renders named link to detail', () => {
    const comp = shallow(
      <WorkshopSummary
        id={12}
        desc='Na workshopu se zaměříme na práci s tělem, nonverbální herectví a pantomimu.'
        difficulty='Pro všechny'
        name='Pantomima a fyzické divadlo'
        lectors={[
          {
            id: 23,
            lector: { name: 'Vojtěch Svoboda' },
            role: 'Hlavní lektor'
          },
          {
            id: 98,
            lector: { name: 'Martin Vlk' },
            role: 'Doprovodný lektor'
          }
        ]}
      />
    )
    expect(comp.find('PermaLink[to="workshopDetail"]').filter({
      children: 'Pantomima a fyzické divadlo'
    })).toHaveLength(1)
  })
})
