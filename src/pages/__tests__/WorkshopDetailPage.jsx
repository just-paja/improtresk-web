import React from 'react'

import WorkshopDetailPage from '../WorkshopDetailPage'

import { renderContainer } from '../../../mock/containers'

describe('WorkshopDetail page', () => {
  let comp

  beforeEach(() => {
    comp = renderContainer(<WorkshopDetailPage match={{ params: { slug: 'nehraj-23125' } }} />)
  })

  it('passes route match', () => {
    expect(comp.find('WorkshopDetailPage')).toHaveProp('match', { params: { slug: 'nehraj-23125' } })
  })
})
