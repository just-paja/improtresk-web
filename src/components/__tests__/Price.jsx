import React from 'react'

import { shallow } from 'enzyme'

import Price from '../Price'

describe('Price component', () => {
  it('renders price', () => {
    const comp = shallow(<Price price={153} />)
    expect(comp).toHaveText('153 Kč')
  })

  it('renders free with default message', () => {
    const comp = shallow(<Price price={0} />)
    expect(comp.find('Connect(Message)[name="generic.free"]')).toHaveLength(1)
  })

  it('renders free with custom message', () => {
    const comp = shallow(<Price freeMessage='price.includedInSignup' price={0} />)
    expect(comp.find('Connect(Message)[name="price.includedInSignup"]')).toHaveLength(1)
  })
})
