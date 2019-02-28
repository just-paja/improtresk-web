import React from 'react'
import configureStore from 'redux-mock-store'

import { Provider } from 'react-redux'
import { mount } from 'enzyme'

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
    comp = mount(<Provider store={store}><App /></Provider>)
  })

  it('provides number of active requests', () => {
    expect(comp.find('App')).toHaveProp('activeRequests')
  })

  it('triggers app mounted action on mount', () => {
    expect(store.getActions()).toMatchObject([
      { type: 'APP_MOUNTED' }
    ])
  })
})
