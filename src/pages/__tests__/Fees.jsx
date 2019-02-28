import React from 'react'

import Fees from '../Fees'

import { renderContainer } from '../../../mock/containers'

describe('Fees container', () => {
  let comp

  beforeEach(() => {
    comp = renderContainer(<Fees />)
  })

  it('renders fees page', () => {
    expect(comp.find('Fees')).toHaveLength(1)
  })
})
