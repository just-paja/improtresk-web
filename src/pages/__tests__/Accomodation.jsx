import React from 'react'

import Accomodation from '../Accomodation'

import { renderContainer } from '../../../mock/containers'

describe('Accomodation container', () => {
  let comp

  beforeEach(() => {
    comp = renderContainer(<Accomodation />)
  })

  it('provides translate method', () => {
    expect(comp.find('Accomodation')).toHaveProp('translate')
  })
})
