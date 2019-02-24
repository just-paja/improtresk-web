import configureMockStore from 'redux-mock-store'
import React from 'react'

import { shallow } from 'enzyme'

import Signup from '../Signup'

const mockStore = configureMockStore()

describe('Signup container', () => {
  let comp
  let store

  beforeEach(() => {
    store = mockStore({
      accomodation: {
        list: {
          data: [
            {
              id: 5,
              name: 'Something new'
            }
          ],
          valid: true
        }
      },
      years: {
        capacity: {
          data: [],
          valid: true
        },
        list: {
          data: [
            {
              id: 150,
              current: true,
              topic: 'foo'
            }
          ],
          valid: true
        }
      },
      texts: {}
    })
    comp = shallow(<Signup />, {
      context: { store }
    })
  })

  it('provides progress', () => {
    expect(comp.find('SceneProgress(Connect(Signup))')).toHaveProp('progress', {
      errors: [],
      failed: false,
      loading: false,
      missing: false,
      required: false,
      valid: true
    })
  })

  it('triggers home mounted action on mount', () => {
    comp.dive()
    expect(store.getActions()).toEqual([
      { type: 'PAGE_SIGNUP_ENTERED' }
    ])
  })
})
