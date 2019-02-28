import React from 'react'

import { newsListFetch } from '../../actions'

import NewsList from '../NewsList'

import { renderContainer } from '../../../../mock/containers'

describe('NewsList container', () => {
  let comp

  beforeEach(() => {
    const state = {
      news: {
        list: {
          valid: true,
          data: [
            {
              id: 20,
              createdAt: '2017-03-05T00:00:00',
              name: 'lunch',
              text: 'foo',
              lang: 'cs'
            }
          ]
        }
      }
    }
    comp = renderContainer(<NewsList to='foo' />, state)
  })

  it('provides list of news', () => {
    expect(comp.find('NewsList')).toHaveProp('news', [
      {
        id: 20,
        createdAt: '2017-03-05T00:00:00',
        name: 'lunch',
        text: 'foo',
        lang: 'cs'
      }
    ])
  })

  it('dispatches news required action on mount', () => {
    expect(comp.store.getActions()).toContainEqual(expect.objectContaining({
      type: newsListFetch.TRIGGER
    }))
  })
})
