import React from 'react'

import MultiLingualMarkdown from '../MultiLingualMarkdown'

import { renderContainer } from '../../../mock/containers'

describe('MultiLingualMarkdown container', () => {
  let comp

  beforeEach(() => {
    comp = renderContainer(<MultiLingualMarkdown />)
  })

  it('provides selected language', () => {
    expect(comp.find('MultiLingualMarkdown')).toHaveProp('lang', 'cs')
  })
})
