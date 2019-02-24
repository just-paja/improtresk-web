import React from 'react'
import configureStore from 'redux-mock-store'

import { shallow } from 'enzyme'

import { performerListFetch } from '../../actions'

import PerformerList from '../PerformerList'

const mockStore = configureStore()

describe('PerformerList container', () => {
  let comp
  let store

  beforeEach(() => {
    store = mockStore({
      locale: {
        languages: ['cs']
      },
      performers: {
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
    comp = shallow(<PerformerList to='foo' />, {
      context: { store }
    })
  })

  it('provides list of performers', () => {
    expect(comp.dive().dive().find('PerformerList')).toHaveProp('performerList', [
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
      type: performerListFetch.TRIGGER
    }))
  })
})
