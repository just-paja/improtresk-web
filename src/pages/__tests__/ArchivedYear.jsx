import React from 'react'

import ArchivedYear from '../ArchivedYear'

import { renderContainer } from '../../../mock/containers'

describe('ArchivedYear page', () => {
  let comp

  beforeEach(() => {
    comp = renderContainer(<ArchivedYear match={{ params: { slug: '2017' } }} />)
  })

  it('provides route match', () => {
    expect(comp.find('ArchivedYear')).toHaveProp('match', {
      params: {
        slug: '2017'
      }
    })
  })
})
