import configureMockStore from 'redux-mock-store'
import React from 'react'

import { shallow } from 'enzyme'

import Food from '../Food'

const mockStore = configureMockStore()

describe('Food container', () => {
  let comp
  let store

  beforeEach(() => {
    store = mockStore({
      locale: {
        languages: []
      }
    })
    comp = shallow(<Food />, {
      context: { store }
    })
  })

  it('provides translate method', () => {
    expect(comp.find('Food')).toHaveProp('translate')
  })
})
