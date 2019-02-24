import React from 'react'

import { shallow } from 'enzyme'

import FoodChoice from '../FoodChoice'

describe('FoodChoice component', () => {
  it('renders selected food name', () => {
    const comp = shallow(
      <FoodChoice foodName='Svíčková' />
    )
    expect(comp.find({
      children: 'Svíčková'
    })).toHaveLength(1)
  })

  it('renders default food when given no choice and picking food is disabled', () => {
    const comp = shallow(<FoodChoice useDefault />)
    expect(comp.find('Connect(Message)[name="orders.defaultFood"]')).toHaveLength(1)
  })

  it('renders default food when given no choice and picking food is enabled', () => {
    const comp = shallow(<FoodChoice />)
    expect(comp.find('Connect(Message)[name="orders.foodNotSelected"]')).toHaveLength(1)
  })
})
