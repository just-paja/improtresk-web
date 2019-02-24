import React from 'react'

import { shallow } from 'enzyme'

import Prop from '../Prop'

describe('Prop component', () => {
  it('renders label', () => {
    const comp = shallow(
      <Prop label='Prop Label' icon='Prop Icon'>foo</Prop>
    )
    expect(comp.find({ children: ['Prop Label', ':'] })).toHaveLength(1)
  })

  it('renders without icon', () => {
    const comp = shallow(<Prop label='Prop Label'>foo</Prop>)
    expect(comp.find('FontAwesome')).toHaveLength(0)
  })

  it('renders empty without children', () => {
    expect(shallow(
      <Prop label='Prop Label' />
    ).getElement()).toBe(null)
  })
})
