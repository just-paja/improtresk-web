import configureMockStore from 'redux-mock-store'
import React from 'react'

import { shallow } from 'enzyme'

import ChangeFood from '../ChangeFood'

const mockStore = configureMockStore()

describe('ChangeFood container', () => {
  let comp
  let store

  beforeEach(() => {
    store = mockStore({
      locale: {
        languages: []
      },
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
      food: {
        list: {
          data: [],
          valid: true
        }
      },
      orders: {
        list: {
          data: []
        }
      },
      participants: {
        detail: {
          data: null,
          valid: true
        }
      },
      workshops: {
        lectors: {
          list: {
            data: [],
            valid: true
          }
        },
        list: {
          data: [],
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
      }
    })
    comp = shallow(<ChangeFood />, {
      context: { store }
    })
  })

  it('provides progress', () => {
    expect(comp.find('SceneProgress(Connect(ChangeFoodPage))')).toHaveProp('progress')
  })

  it('triggers home mounted action on mount', () => {
    comp.dive().dive()
    expect(store.getActions()).toEqual([
      { type: 'ORDER_RESOURCES_REQUIRED' }
    ])
  })
})
