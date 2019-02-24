import React from 'react'
import configureStore from 'redux-mock-store'

import { shallow } from 'enzyme'

import TipList from '../TipList'

const mockStore = configureStore()

describe('TipList container', () => {
  let comp
  let store

  beforeEach(() => {
    store = mockStore({
      locale: {
        languages: ['cs']
      },
      texts: {
        tips: {
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
    comp = shallow(<TipList />, {
      context: { store }
    })
  })

  it('provides list of tips', () => {
    expect(comp.dive().dive().find('TipList')).toHaveProp('tips', [
      {
        id: 20,
        createdAt: '2017-03-05T00:00:00',
        name: 'lunch',
        text: 'foo',
        lang: 'cs'
      }
    ])
  })

  it('dispatches tips required action on mount', () => {
    comp.dive()
    expect(store.getActions()).toContainEqual(expect.objectContaining({
      type: 'TIPS_REQUIRED'
    }))
  })
})
