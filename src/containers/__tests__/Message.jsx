import React from 'react'

import Message from '../Message'

import { renderContainer } from '../../../mock/containers'

describe('Message container', () => {
  let comp

  beforeEach(() => {
    comp = renderContainer(<Message name='foo' />)
  })

  it('provides translate function', () => {
    expect(comp.find('Message')).toHaveProp('translate')
  })
})
