import configureMockStore from 'redux-mock-store'
import React from 'react'

import { shallow } from 'enzyme'

import Home from '../Home'

const mockStore = configureMockStore()

describe('Home container', () => {
  let comp
  let store

  beforeEach(() => {
    store = mockStore({
      years: {
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
    comp = shallow(<Home />, {
      context: { store }
    })
  })

  it('provides active year', () => {
    expect(comp.find('Home')).toHaveProp('year', {
      id: 150,
      current: true,
      topic: 'foo'
    })
  })
})
