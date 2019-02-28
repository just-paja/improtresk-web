import React from 'react'

import { newsDetailFetch } from '../../actions'

import NewsArticle from '../NewsArticle'

import { renderContainer } from '../../../../mock/containers'

describe('NewsArticle container', () => {
  let comp

  beforeEach(() => {
    const state = {
      news: {
        detail: {
          valid: true,
          data: {
            id: 20,
            createdAt: '2017-03-05T00:00:00',
            updatedAt: '2017-03-05T00:00:00',
            name: 'lunch',
            text: 'foo',
            lang: 'cs',
            photos: []
          }
        }
      }
    }
    comp = renderContainer(<NewsArticle resourceId='news-10' />, state)
  })

  it('provides news item', () => {
    expect(comp.find('NewsArticle')).toHaveProp('newsDetail', {
      id: 20,
      createdAt: '2017-03-05T00:00:00',
      updatedAt: '2017-03-05T00:00:00',
      name: 'lunch',
      text: 'foo',
      lang: 'cs',
      photos: []
    })
  })

  it('dispatches news detail required action on mount', () => {
    expect(comp.store.getActions()).toContainEqual(expect.objectContaining({
      type: newsDetailFetch.TRIGGER,
      payload: 'news-10'
    }))
  })
})
