import React from 'react'
import configureStore from 'redux-mock-store'

import { shallow } from 'enzyme'

import { newsListFetch } from '../../actions'

import NewsList from '../NewsList'

const mockStore = configureStore()

describe('NewsList container', () => {
  let comp
  let store

  beforeEach(() => {
    store = mockStore({
      locale: {
        languages: ['cs']
      },
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
    })
    comp = shallow(<NewsList to='foo' />, {
      context: { store }
    })
  })

  it('provides list of news', () => {
    expect(comp.dive().dive().find('NewsList')).toHaveProp('news', [
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
    comp.dive()
    expect(store.getActions()).toContainEqual(expect.objectContaining({
      type: newsListFetch.TRIGGER
    }))
  })
})
