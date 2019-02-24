import React from 'react'
import sinon from 'sinon'

import { shallow } from 'enzyme'

import WorkshopPickerItem from '../WorkshopPickerItem'

describe('WorkshopPickerItem component', () => {
  it('renders workshop name', () => {
    const comp = shallow((
      <WorkshopPickerItem
        assigned={2}
        id={230}
        capacity={12}
        freeSpots={7}
        lectors={[]}
        name='Longformy'
        onChange={() => {}}
        reserved={3}
      />
    ))
    expect(comp.find({ children: 'Longformy' })).toHaveLength(1)
  })

  it('renders minus icon when full', () => {
    const comp = shallow((
      <WorkshopPickerItem
        id={230}
        capacity={12}
        lectors={[]}
        name='Longformy'
        onChange={() => {}}
        freeSpots={0}
      />
    ))
    expect(comp.find('[name="minus-circle"]'))
  })

  it('triggers onChange with null when selected', () => {
    const changeSpy = sinon.spy()
    const comp = shallow((
      <WorkshopPickerItem
        id={230}
        capacity={12}
        lectors={[]}
        name='Longformy'
        onChange={changeSpy}
        selected
      />
    ))
    comp.find('ListGroupItem').simulate('click')
    expect(changeSpy.args).toEqual([
      [null]
    ])
  })

  it('triggers onChange with id when not selected', () => {
    const changeSpy = sinon.spy()
    const comp = shallow((
      <WorkshopPickerItem
        id={230}
        capacity={12}
        lectors={[]}
        name='Longformy'
        onChange={changeSpy}
      />
    ))

    comp.find('ListGroupItem').simulate('click')
    expect(changeSpy.args).toEqual([
      [230]
    ])
  })

  it('triggers onChange with id when not selected', () => {
    const changeSpy = sinon.spy()
    const comp = shallow((
      <WorkshopPickerItem
        id={230}
        disabled
        capacity={12}
        lectors={[]}
        name='Longformy'
        onChange={changeSpy}
      />
    ))

    comp.find('ListGroupItem').simulate('click')
    expect(changeSpy.called).toBeFalsy()
  })
})
