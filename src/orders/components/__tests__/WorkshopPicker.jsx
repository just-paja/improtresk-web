import React from 'react'
import sinon from 'sinon'

import { shallow } from 'enzyme'

import WorkshopPicker from '../WorkshopPicker'

describe('WorkshopPicker component', () => {
  it('renders picker items', () => {
    const comp = shallow((
      <WorkshopPicker
        allowEmpty
        input={{
          name: 'workshop',
          onChange: () => {},
          value: 21
        }}
        meta={{}}
        workshops={[
          {
            id: 21,
            lectors: [],
            name: 'Longformy',
            capacityStatus: {
              assigned: 2,
              capacity: 12,
              freeSpots: 7,
              reserved: 3
            }
          },
          {
            id: 32,
            lectors: [],
            name: 'Kontaktní improvizace',
            capacityStatus: {
              assigned: 0,
              capacity: 19,
              freeSpots: 19,
              reserved: 0
            }
          }
        ]}
      />
    ))
    expect(comp.find('WorkshopPickerItem')).toHaveLength(3)
  })

  it('renders selected picker items', () => {
    const comp = shallow((
      <WorkshopPicker
        input={{
          name: 'workshop',
          onChange: () => {},
          value: 21
        }}
        meta={{}}
        workshops={[
          {
            id: 21,
            lectors: [],
            name: 'Longformy',
            capacityStatus: {
              assigned: 2,
              capacity: 12,
              freeSpots: 7,
              reserved: 3
            }
          },
          {
            id: 32,
            lectors: [],
            name: 'Kontaktní improvizace',
            capacityStatus: {
              assigned: 0,
              capacity: 19,
              freeSpots: 19,
              reserved: 0
            }
          }
        ]}
      />
    ))
    expect(comp.find('WorkshopPickerItem[selected=true]').prop('id')).toBe(21)
  })

  it('renders error when given error and touched', () => {
    const comp = shallow((
      <WorkshopPicker
        input={{
          name: 'workshop',
          onChange: () => {},
          value: 21
        }}
        meta={{
          error: 'Something went wrong',
          touched: true
        }}
        workshops={[
          {
            id: 21,
            lectors: [],
            name: 'Longformy',
            capacityStatus: {
              assigned: 2,
              capacity: 12,
              freeSpots: 7,
              reserved: 3
            }
          }
        ]}
      />
    ))
    expect(comp.find('[errors="Something went wrong"]')).toHaveLength(1)
  })

  it('triggers onChange with id when not selected', () => {
    const onChange = sinon.spy()
    const comp = shallow((
      <WorkshopPicker
        input={{
          name: 'workshop',
          onChange,
          value: 21
        }}
        meta={{}}
        workshops={[
          {
            name: 'Longformy',
            id: 21,
            lectors: [],
            capacityStatus: {
              capacity: 12
            }
          }
        ]}
      />
    ))
    comp.find('WorkshopPickerItem').at(0).simulate('change', 21)
    expect(onChange.args).toEqual([
      [21]
    ])
  })
})
