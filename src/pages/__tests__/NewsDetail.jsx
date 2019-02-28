import React from 'react'

import NewsDetail from '../NewsDetail'

import { renderContainer } from '../../../mock/containers'

describe('NewsDetail page', () => {
  let comp

  beforeEach(() => {
    comp = renderContainer(<NewsDetail match={{ params: { slug: 'news-detail-45' } }} />)
  })

  it('provides route match', () => {
    expect(comp.find('NewsDetail')).toHaveProp('match', {
      params: {
        slug: 'news-detail-45'
      }
    })
  })
})
