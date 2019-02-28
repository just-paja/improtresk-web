import React from 'react'

import { performerDetailFetch } from '../../actions'

import PerformerDetail from '../PerformerDetail'

import { renderContainer } from '../../../../mock/containers'

describe('PerformerDetail container', () => {
  let comp

  beforeEach(() => {
    const state = {
      performers: {
        detail: {
          valid: true,
          data: {
            id: 20,
            createdAt: '2017-03-05T00:00:00',
            name: 'lunch',
            text: 'foo',
            lang: 'cs',
            links: [],
            photos: [
              {
                id: 10,
                image: '/images/10.jpg',
                width: 640,
                height: 480
              }
            ]
          }
        }
      }
    }
    comp = renderContainer(<PerformerDetail resourceId='20000-zidu-pod-morem-3154' />, state)
  })

  it('provides list of news', () => {
    expect(comp.find('PerformerDetail')).toHaveProp('performer', {
      id: 20,
      createdAt: '2017-03-05T00:00:00',
      name: 'lunch',
      text: 'foo',
      lang: 'cs',
      links: [],
      photos: [
        {
          id: 10,
          image: '/images/10.jpg',
          width: 640,
          height: 480
        }
      ],
      frontImage: '/images/10.jpg'
    })
  })

  it('dispatches news required action on mount', () => {
    expect(comp.store.getActions()).toContainEqual(expect.objectContaining({
      type: performerDetailFetch.TRIGGER,
      payload: '20000-zidu-pod-morem-3154'
    }))
  })
})
