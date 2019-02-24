import React from 'react'

import { shallow } from 'enzyme'

import Container from '../Container'

describe('Container component', () => {
  it('renders bootstrap container', () => {
    expect(shallow(<Container>foo</Container>).find('Container')).toHaveLength(1)
  })

  it('renders children', () => {
    expect(shallow(<Container><div className='foo' /></Container>).find('.foo')).toHaveLength(1)
  })
})
