import React from 'react'
import configureStore from 'redux-mock-store'

import { shallow } from 'enzyme'

import App from '../App'

const mockStore = configureStore()

describe('App container', () => {
  let comp
  let store

  beforeEach(() => {
    store = mockStore({
      locale: {
        languages: ['cs', 'en']
      },
      participants: {
        detail: {}
      },
      session: {
      },
      server: {
      },
      workshops: {
        lectors: {
          roles: {},
          list: {}
        }
      },
      years: {
        list: {
          data: []
        }
      }
    })
    comp = shallow(<App />, {
      context: { store }
    })
  })

  it('provides number of active requests', () => {
    expect(comp.find('App')).toHaveProp('activeRequests')
  })

  it('triggers app mounted action on mount', () => {
    comp.dive()
    expect(store.getActions()).toMatchObject([
      { type: 'APP_MOUNTED' }
    ])
  })
})
