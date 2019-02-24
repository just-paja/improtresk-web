import React from 'react'
import sinon from 'sinon'

import { shallow } from 'enzyme'

import AccomodationPickerItem from '../AccomodationPickerItem'

describe('AccomodationPickerItem component', () => {
  it('renders as radio input', () => {
    const comp = shallow((
      <AccomodationPickerItem
        capacityStatus={{}}
        id={230}
        price={200}
        name='Hotel'
        parentName='accomodation'
        onChange={() => {}}
      />
    ))
    expect(comp.find('InputRadio')).toHaveLength(1)
  })

  it('triggers onChange with id when not selected', () => {
    const changeSpy = sinon.spy()
    const comp = shallow((
      <AccomodationPickerItem
        capacityStatus={{}}
        id={230}
        price={200}
        name='Hotel'
        parentName='accomodation'
        onChange={changeSpy}
      />
    ))

    comp.find('InputRadio').simulate('change')
    expect(changeSpy.args).toEqual([[230]])
  })
})
