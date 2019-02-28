import React from 'react'

import Link from '../Link'

import { renderContainer } from '../../../mock/containers'

describe('Link container', () => {
  let comp

  beforeEach(() => {
    comp = renderContainer(<Link to='home' />)
  })

  it('provides language', () => {
    expect(comp.find('Link').first()).toHaveProp('lang', 'cs')
  })
})
