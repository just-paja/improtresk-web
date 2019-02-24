import React from 'react'

import { shallow } from 'enzyme'

import FoodMenuItem from '../FoodMenuItem'

describe('FoodMenuItem component', () => {
  it('renders', () => {
    expect(shallow(<FoodMenuItem name='foo' />)).toMatchElement(
      <div>foo</div>
    )
  })
})
